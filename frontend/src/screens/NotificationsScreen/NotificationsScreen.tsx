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
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
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

                setNotifications((prev) => [...prev, newNotification]);
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

        if (days > 0) {
            return `${days} day(s) ago`;
        } else if (hours > 0) {
            return `${hours} hour(s) ago`;
        } else {
            return `${minutes} minute(s) ago`;
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
                        {item.notificationType === 'like' && <Text>liked your post.</Text>}
                    </Text>
                    <Text style={styles.timeText}>{timeDifference}</Text>
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
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        marginBottom: 15
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
