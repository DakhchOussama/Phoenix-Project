import React, { useState, forwardRef, useEffect  } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import PostItem from "../../components/Post";
import CategoryItem from "../../components/Categories";
import { ScrollView } from 'react-native-gesture-handler';
import { getPosts } from "../../services/postService";

interface PostFromApi {
  PostID: string;
  ImgURL?: string;
  Title: string;
  Categories: string;
  Type: "DEMAND" | "SERVICE";
  isEnabled: boolean;
  Likes: number;
  createdAt: string; // or Date if your API returns Date objects
  updatedAt: string; // or Date if your API returns Date objects
  userId: string;
  fname: string; // Assuming this is part of the API response
  sname: string; // Assuming this is part of the API response
  userAvatar: string; // Assuming this is part of the API response
  translates?: string;
}

interface MappedPost {
  id: string;
  title: "DEMAND" | "SERVICE";
  description: string;
  avatar: any; // Update this based on the type you use for avatars
  image: { uri: string } | null;
  username: string;
  time: string;
  likes: number;
  translate?: string;
}


const Services =  () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [list, setlist] = useState(false);
    const [posts, setPosts] = useState<MappedPost[]>([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const fetchedPosts: PostFromApi[] = await getPosts(); // Replace with your actual API call
        const mappedPosts: MappedPost[] = fetchedPosts.map((post: PostFromApi) => ({
          id: post.PostID,
          title: post.Type,
          description: post.Title,
          avatar: require('../../assets/profile_user.jpg'), // Assuming this is static
          image: post.ImgURL ? { uri: post.ImgURL } : null,
          username: `${post.fname} ${post.sname}`,
          time: new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          likes: post.Likes,
          translate: post.translates
        }));
        setPosts(mappedPosts);
      };
  
      fetchPosts();
    }, []);


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