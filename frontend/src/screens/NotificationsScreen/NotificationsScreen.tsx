import React from "react";
import { Image, Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";

interface Notification {
    id: string;
    type: string;
    user: string;
    action: string;
    time: string;
    isFollowBack: boolean;
}

interface Section {
    type: string;
    data: Notification[];
}

export default function NotificationsScreen() {
    const { width } = Dimensions.get("window");

    // Original data
    const rawData: Notification[] = [
        { id: '1', type: 'New', user: 'Emma John', action: 'liked your post.', time: '2h', isFollowBack: false },
        { id: '2', type: 'New', user: 'Emma John', action: 'posted a service.', time: '2h', isFollowBack: false },
        { id: '3', type: 'New', user: 'Emma John', action: 'started following you.', time: '2h', isFollowBack: true },
        { id: '4', type: 'Yesterday', user: 'Emma John', action: 'liked your post.', time: '1d', isFollowBack: false },
        { id: '5', type: 'Yesterday', user: 'Emma John', action: 'posted a service.', time: '1d', isFollowBack: false },
        { id: '6', type: 'Yesterday', user: 'Emma John', action: 'started following you.', time: '1d', isFollowBack: true },
    ];

    // Group data by type
    const groupedData: { [key: string]: Notification[] } = rawData.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
    }, {} as { [key: string]: Notification[] });

    // Convert grouped data into an array of sections
    const sections: Section[] = Object.keys(groupedData).map(type => ({
        type,
        data: groupedData[type],
    }));

    const renderItem = ({ item }: { item: Notification }) => (
        <View style={styles.itemContainer}>
            <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
            <Text style={styles.notificationText}>
                <Text style={styles.userText}>{item.user}</Text> {item.action} <Text style={styles.timeText}>{item.time}</Text>
            </Text>
            {item.isFollowBack && (
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow back</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderSectionHeader = ({ section }: { section: Section }) => (
        <Text style={styles.sectionHeader}>{section.type}</Text>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Notifications</Text>
                <View style={styles.headerLine} />
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={sections}
                    keyExtractor={item => item.type}
                    renderItem={({ item }) => (
                        <>
                            {renderSectionHeader({ section: item })}
                            {item.data.map(notification => (
                                <View key={notification.id}>
                                    {renderItem({ item: notification })}
                                </View>
                            ))}
                        </>
                    )}
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
        width: 150
    },
    listContainer: {
        flex: 3,
        padding: 15,
    },
    sectionHeader: {
        fontFamily: 'Raleway-Bold',
        color: '#434752',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
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
        borderColor: '#E0E1E3'
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
    timeText: {
        color: '#bdbbbb',
    },
    followButton: {
        backgroundColor: '#DD644A',
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
