import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import PostItem from "../../components/Post";
import CategoryItem from "../../components/Categories";

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [list, setlist] = useState(false);

    const posts = [
        {
            id: 1,
            title: 'Service',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile_user.jpg'),
            image: null,
            username: 'John Doe',
            time: "2h",
            likes: 10
        },
        {
            id: 2,
            title: 'Demand',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile.png'),
            image: require('../../assets/wallet.jpg'),
            username: 'Oussama Dakhch',
            time: "2h",
            likes: 20
        },
        {
            id: 3,
            title: 'Service',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile_user.jpg'),
            image: null,
            username: 'John Doe',
            time: "2h",
            likes: 120
        },
        {
          id: 4,
          title: 'Service',
          description: 'kan9alab 3la dars bach l exams jay, bghit chi wahd experience f lmath and science',
          avatar: require('../../assets/profile_user.jpg'),
          image: null,
          username: 'John Doe',
          time: "2h",
          likes: 120,
          translate: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.'
        },
    ];

    const handlePress = (index: number) => {
        setSelectedCategory(selectedCategory === index ? null : index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <CategoryItem selectedCategory={selectedCategory} handlePress={handlePress} />
            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <ScrollView horizontal={false} style={{ marginTop: 10 }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Icon name="list" size={27} style={{ marginRight: 10, color: "#4a4f5b" }} onPress={() => setlist(!list)} />
                        </View>
                        {list && (
                          <View style={styles.dropdownContainer}>
                            <TouchableOpacity style={styles.dropdownItem}>
                              <Icon name="tools" size={20} color="#4a4f5b" />
                              <Text style={styles.dropdownText}>Service</Text>
                            </TouchableOpacity>
                            <View style={styles.divider} />
                            <TouchableOpacity style={styles.dropdownItem}>
                              <Icon name="megaphone" size={20} color="#4a4f5b" />
                              <Text style={styles.dropdownText}>Demand</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <View style={{ margin: 21, marginTop: 12 }}>
                            {posts.map((post) => (
                                <View key={post.id}>
                                    <PostItem post={post} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Services;

const styles = StyleSheet.create({
    // ... (keep your existing styles)
  
    dropdownContainer: {
      backgroundColor: 'white',
      position: 'absolute',
      right: 30,
      top: 30,
      zIndex: 999,
      width: 180,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      overflow: 'hidden',
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    dropdownText: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: 16,
      fontWeight: '600',
      color: '#4a4f5b',
      marginLeft: 10,
    },
    divider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginHorizontal: 10,
    },
  });