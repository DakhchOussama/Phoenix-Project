import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { connectSocket } from "../../services/socketService";
import { BASE_URL } from "@env";
import { fetchNotificationsData } from "../../services/notificationService";
import Loading from "../../components/Loading";

interface Notification {
    notificationId: string;
    notificationType: string;
    username: string;
    avatar: string;
    createdAt: string;
}

interface LikeSocket {
    notificationId: string;
    notificationType: string;
    username: string;
    avatar: string;
    createdAt: string;
}

export default function NotificationsScreen() {
    const { width } = Dimensions.get("window");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const data = await fetchNotificationsData();
                setLoading(false);
                if (Array.isArray(data) && data.length > 0) {
                    // Sort notifications by createdAt in descending order
                    const sortedNotifications = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setNotifications(sortedNotifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setLoading(false); // Ensure loading state is reset on error
            }
        };

        fetchNotifications();

        const socket = connectSocket();

        if (socket) {
            socket.on('Like', (data: LikeSocket) => {
                const newNotification: Notification = {
                    notificationId: data.notificationId,
                    notificationType: data.notificationType,
                    username: data.username,
                    avatar: data.avatar,
                    createdAt: data.createdAt
                };

                setNotifications((prev) => {
                    // Combine previous notifications and the new one
                    const updatedNotifications = [...prev, newNotification];
                    // Sort updated notifications by createdAt in descending order
                    return updatedNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                });
            });
        }

        return () => {
            socket.off('Like');
        };
    }, []);

    if (loading) return <Loading />;

    const getTimeDifference = (createdAt: string) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifference = Math.abs(currentDate.getTime() - createdDate.getTime());

        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (minutes < 1) {
            return 'just now'; // Show "just now" for less than a minute
        } else if (days > 0) {
            return days === 1 ? '1 day ago' : `${days} days ago`; // Singular/plural for days
        } else if (hours > 0) {
            return hours === 1 ? '1 hour ago' : `${hours} hours ago`; // Singular/plural for hours
        } else {
            return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`; // Singular/plural for minutes
        }
    };

    const renderItem = ({ item }: { item: Notification }) => {
        const imageUri = item.avatar ? `${BASE_URL}/posts/image/${item.avatar}` : null;
        const timeDifference = getTimeDifference(item.createdAt);

        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
                <Image 
                    source={imageUri ? { uri: imageUri } : require('../../assets/profile.png')} 
                    style={styles.profileImage} 
                />
                <View style={styles.textContainer}>
                    <Text style={styles.notificationText}>
                        <Text style={styles.userText}>{item.username} </Text>
                        {item.notificationType === 'like' && <Text> liked your post.</Text>}
                        {/* Display the time difference within the same line */}
                        <Text style={styles.timeText}> {timeDifference}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Notifications</Text>
                <View style={styles.headerLine} />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.notificationId}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        height: 140,
    },
    headerText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 35,
        color: '#434752',
    },
    headerLine: {
        backgroundColor: '#DD644A',
        height: 3,
        borderRadius: 15,
        marginTop: 4,
        width: 150,
    },
    listContainer: {
        flex: 1,
        padding: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA', // Light background for visual comfort
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 15, // Slightly larger for a smoother look
        elevation: 4, // Enhanced elevation for better shadow effect
        shadowColor: '#000',
        shadowOpacity: 0.2, // Increased shadow opacity for a more pronounced effect
        shadowRadius: 8, // Increased shadow radius for a softer shadow
        shadowOffset: { width: 0, height: 4 }, // Adjusted shadow offset
        borderWidth: 1, // Added border for better definition
        borderColor: '#DDDDDD', // Light gray border for subtle contrast
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    notificationText: {
        fontFamily: 'Poppins-Regular',
        color: '#434752',
        fontSize: 15,
    },
    userText: {
        color: '#DD644A',
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
    },
    timeText: {
        fontFamily: 'Poppins-Regular',
        color: '#9A9A9A',
        fontSize: 12,
        marginTop: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
        color: '#434752',
    },
});
