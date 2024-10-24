import React, { useState, forwardRef, useEffect  } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import PostItem from "../../components/Post";
import CategoryItem from "../../components/Categories";
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { getPosts, likePost } from "../../services/postService";
import { BASE_URL } from "@env";
import Loading from "../../components/Loading";
import PostDetails from "./PostDetails";
import Toast from "react-native-toast-message";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { usePostContext } from "../../store/PostProvider";


interface MappedPost {
  id: string;
  userId: string;
  title: string;
  description: string;
  avatar: any;
  image: { uri: string } | null;
  username: string;
  time: string;
  likes: number;
  translate?: string;
  Categories: string;
  isEnabled: boolean;
  isOwnPost: boolean;
  daysAgo: number;
  Phone: string
}

interface ServicesProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const { width, height } = Dimensions.get('window');

const aspectRatio = height / width;

const smallScreen = (width <= 1080 && aspectRatio <= 1.8);

const Services: React.FC<ServicesProps> =  ({ selectedCategory, setSelectedCategory }) => {
  const [listType, setListType] = useState<string | null>(null);
  const [list, setlist] = useState(false);
  const [posts, setPosts] = useState<MappedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  // const { posts } = usePostContext();
  const { posts: contextPosts, setRefresh } = usePostContext();  
  
  const fetchPosts = async () => {

    if (contextPosts){
      // console.log('posts : ', posts)
      // console.log('contextPosts : ', contextPosts);
      const fetchedPosts = contextPosts.filter((post) => {
        return post.Type == 'Offer' || post.Type == 'Demand';
      });
      
      if (fetchedPosts){
        const mappedPosts: MappedPost[] = fetchedPosts.map(post => ({
          id: post.PostID,
          userId: post.userId,
          title: post.Type,
          description: post.Title,
          avatar: post.avatar,
          image: post.ImgURL ? { uri: `${BASE_URL}/posts/image/${post.ImgURL}` } : null,
          username: post.sname ? `${post.fname} ${post.sname}` : `${post.fname}`,
          time: new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          likes: post.Likes,
          translate: post.translates,
          Categories: post.Categories,
          isEnabled: post.isEnabled,
          isOwnPost: post.isOwnPost,
          daysAgo: Math.floor((new Date().getTime() - new Date(post.createdAt).getTime()) / (1000 * 3600 * 24)),
          Phone: post.Phone
        }));
        setPosts(mappedPosts);
      }
    }
    
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchPosts();
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
}, [contextPosts]);




  const onRefresh = async () => {
    setRefreshing(true);
    setRefresh(true);
    fetchPosts();
    setRefreshing(false);
  };
  
    
  if (isLoading) {
    return <Loading />;
  }

  const handlePress = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

    const handleLikeToggle = async (postId: any, liked: any) => {
      setPosts(posts.map(post => 
          post.id === postId
              ? { ...post, likes: liked ? post.likes + 1 : post.likes - 1 }
              : post
      ));        
      
    };

    const handlePostClick = (post: any) => {
      setSelectedPost(post);
    };

    const handleBack = () => {
        setSelectedPost(null);
    };

    const handleListTypePress = (type: string) => {
        setListType(listType === type ? null : type);
      };
  
    
    return (
      <>
      <Toast />
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <MaterialIcons name="arrow-back-ios" size={30} color="#606677" style={styles.arrowbottom} />
          {selectedPost ?  <PostDetails post={selectedPost} onBack={handleBack} /> : (
            <>
              <CategoryItem selectedCategory={selectedCategory} handlePress={handlePress} />

                <View style={{ flex: 2 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <ScrollView
                        horizontal={false}
                        style={{ marginTop: 10 }}
                        refreshControl={
                          <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          colors={['#D84B2C']}
                          tintColor={'#D84B2C'}
                          />
                        }
                        >
                        {list && (
                     
                            <View style={styles.dropdownContainer}>
                              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleListTypePress("Offer")}>
                                <Icon name="bell" size={22} color="#4a4f5b" />
                                <Text style={styles.dropdownText}>Offer</Text>
                              </TouchableOpacity>
                              <View style={styles.divider} />
                              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleListTypePress("Demand")}>
                                <Icon name="megaphone" size={20} color="#4a4f5b"  />
                                <Text style={styles.dropdownText}>Demand</Text>
                              </TouchableOpacity>
                            </View>
                          )}

                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Icon name="list" size={27} style={{ marginRight: 10, color: "#4a4f5b" }} onPress={() => setlist(!list)} />
                            </View>
                            
                            <View style={{ margin: 21, marginTop: 12 }}>
                                {posts.length === 0 ? (
                                  <Text style={styles.noPostsText}>There are currently no posts to display.</Text>
                                ) : (
                                  (listType !== null && selectedCategory !== null ? (
                                    posts
                                      .filter(post => post.title === listType && post.Categories === selectedCategory)
                                      .map(post => (
                                        <View key={post.id}>
                                          <TouchableOpacity onPress={() => handlePostClick(post)}>
                                            <PostItem 
                                              post={post}
                                              onLikeToggle={handleLikeToggle}
                                              comment={true}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                      ))
                                  ) : listType !== null ? (
                                    posts
                                      .filter(post => post.title.toUpperCase() === listType.toUpperCase())
                                      .map(post => (
                                        <View key={post.id}>
                                          <TouchableOpacity onPress={() => handlePostClick(post)}>
                                            <PostItem 
                                              post={post}
                                              onLikeToggle={handleLikeToggle}
                                              comment={true}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                      ))
                                  ) : selectedCategory !== null ? (
                                    posts
                                      .filter(post => post.Categories === selectedCategory)
                                      .map(post => (
                                        <View key={post.id}>
                                          <TouchableOpacity onPress={() => handlePostClick(post)}>
                                            <PostItem 
                                              post={post}
                                              onLikeToggle={handleLikeToggle}
                                              comment={true}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                      ))
                                  ) : (
                                    posts.map(post => (
                                      <View key={post.id}>
                                        <TouchableOpacity onPress={() => handlePostClick(post)}>
                                          <PostItem 
                                            post={post}
                                            onLikeToggle={handleLikeToggle}
                                            comment={true}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    ))
                                  ))
                                )}
                              </View>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Services;

const styles = StyleSheet.create({
    arrowbottom: {
        position: 'absolute',
        left: smallScreen ? 8 : 15,
        top: smallScreen ? 6 : 18
    },
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      position: 'relative',
    },
    dropdownContainer: {
      backgroundColor: 'white',
      position: 'absolute',
      right: 30,
      top: 25,
      // right: 5,
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
    noPostsText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        color: '#979797',
        fontSize: 15,
        marginTop: 10
    },
  });