import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { connectSocket } from "../../services/socketService";
import { BASE_URL } from "@env";
import { fetchNotificationsData } from "../../services/notificationService";

interface Notification {
    notificationId: string;
    notificationType: string;
    username: string;
    avatar: string;
}

interface LikeSocket {
    notificationId: string;
    notificationType: string;
    username: string;
    avatar: string;
}

export default function NotificationsScreen() {
    const { width } = Dimensions.get("window");
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {

        const fetchNotifications = async () => {
            try {
                const data = await fetchNotificationsData();
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
            // Listen for likes
            socket.on('Like', (data: LikeSocket) => {
                const newNotification: Notification = {
                    notificationId: data.notificationId,
                    notificationType: data.notificationType,
                    username: data.username,
                    avatar: data.avatar,
                };
    
                setNotifications((prev) => [...prev, newNotification]);
            });
        }

        // Cleanup on unmount
        return () => {
            socket.off('Like');
        };
    }, []);

    const renderItem = ({ item }: { item: Notification }) => {
        const imageUri = item.avatar ? `${BASE_URL}/posts/image/${item.avatar}` : null;
    
        return (
            <View style={styles.itemContainer}>
                {!imageUri ? (
                    <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
                ) : (
                    <Image source={{ uri: imageUri }} style={styles.profileImage} />
                )}
                <Text style={styles.notificationText}>
                    <Text style={styles.userText}>{item.username} </Text>
                    {item.notificationType == 'like' && (<Text>liked your post.</Text>)}
                    
                </Text>
            </View>
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
        flex: 3,
        padding: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: '#E0E1E3',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    notificationText: {
        fontFamily: 'Poppins-Regular',
        color: '#434752',
        marginLeft: 10,
        fontSize: 15,
        flex: 1,
    },
    userText: {
        color: '#DD644A',
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
    },
    followButton: {
        backgroundColor: '#dc6c55',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    followButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
        color: '#434752',
    },
});
