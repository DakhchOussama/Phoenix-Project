import { BASE_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import { editDescription } from '../services/postService';
import Toast from 'react-native-toast-message';
import Loading from './Loading';

const EditComponent = ({ route, navigation }: { route: any; navigation: any }) => {
    const { post } = route.params; // Get post data from navigation parameters
    const [title, setTitle] = useState(post.title);
    const [olddescription, setOldDescription] = useState('');
    const [description, setDescription] = useState(post.description);
    const [loading, setLoading ] = useState(false);
    // Animated values
    const lineAnimation = useState(new Animated.Value(0))[0];

    const handleSave = async () => {
        // onSave({ title, description });
        if (olddescription && description && description !== olddescription){
            try {
                const success = await editDescription(description, post.id);
                if (success) {
                    setLoading(false);
                    navigation.goBack();
                } else {
                    throw new Error('Failed to edit the description');
                }
            } catch (error) {
                setLoading(false);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to save changes',
                    position: 'top',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 50,
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Change something',
                position: 'top',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 50,
            });
        }
    };

    const handleCancel = () => {
        // Navigate back without saving changes
        navigation.goBack();
    };

    if (loading)
        return <Loading />

    useEffect(() => {
        setTitle(post.title);
        setOldDescription(post.description);
        setDescription(post.description);
        
        // Reset and start the animation each time the component mounts
        lineAnimation.setValue(0); // Reset animation value
        Animated.timing(lineAnimation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [post]); // Depend on `post`

    const imageUri = post && post.avatar ? `${BASE_URL}/posts/image/${post.avatar}` : null;

    // Interpolated line style
    const lineStyle = {
        opacity: lineAnimation,
        width: lineAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        }),
        height: 2,
        backgroundColor: '#ec7f68', // Primary color for the line
        marginBottom: 10,
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3f3f3' }}>
            <View style={styles.cardContainer}>
                <View style={styles.header}>
                    {!imageUri ? (
                        <Image source={require('../assets/profile.png')} style={styles.avatar} />
                    ) : (
                        <Image source={{ uri: imageUri }} style={styles.avatar} />
                    )}
                    <View style={styles.headerText}>
                        <Text style={styles.username}>{post.username}</Text>
                        <Text style={styles.category}>{post.title}</Text>
                    </View>
                    <Text style={styles.time}>{post.time}</Text>
                </View>

                {/* Animated Line */}
                <Animated.View style={lineStyle} />

                <View style={{ justifyContent: 'center', marginTop: 10 }}>
                    <TextInput
                        style={styles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description"
                        multiline
                        placeholderTextColor={'#3C404B'}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.modifyButton} onPress={handleSave}>
                        <Text style={styles.modifyButtonText}>Modify</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    headerText: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    category: {
        fontSize: 14,
        color: '#D84B2C', // Match the primary color
    },
    time: {
        fontSize: 12,
        color: '#9A9A9A',
    },
    descriptionInput: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 180,
        textAlignVertical: 'top',
    },
    modifyButton: {
        backgroundColor: '#434752', // Match the primary color
        padding: 7,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 15,
        width: '60%',
    },
    modifyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        
    },
    cancelButtonText: {
        color: '#D84B2C', // Match the primary color
        fontSize: 14, // Smaller font size for the cancel text
        textDecorationLine: 'underline',
    },
});

export default EditComponent;
