import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native";
import CategoryItem from "../../components/Categories";
import { BASE_URL } from "@env";
import { usePostContext } from "../../store/PostProvider";

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [adminposts, setAdminposts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { posts, setRefresh } = usePostContext();

  const getPostAdmin = async () => {
    try {
      if (posts) {
        const filteredPosts = posts.filter(
          (post) => post.Type === "Collaborations & Partnerships"
        );
        setAdminposts(filteredPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostAdmin();
  }, [posts]);

  const handlePress = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefresh(true);
    await getPostAdmin();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CategoryItem
        selectedCategory={selectedCategory?.toString() || null}
        handlePress={handlePress}
      />
      <View style={{ flex: 2 }}>
        <ScrollView
          horizontal={false}
          style={{ marginTop: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#D84B2C']}
            tintColor={'#D84B2C'} />
          }
        >
          <View style={{ margin: 21, marginTop: 20 }}>
            {adminposts.map((post) => (
              <View key={post.PostID}>
                <View style={styles.postContainer}>
                  {/* name & like */}
                  <View style={styles.nameLikeContainer}>
                    {/* name and img */}
                    <View style={styles.nameImgContainer}>
                      <View style={styles.avatarContainer}>
                        <Image
                          source={require("../../assets/bot.png")}
                          style={styles.avatar}
                        />
                      </View>
                      <View style={styles.nameTextContainer}>
                        {/* name and min */}
                        <View>
                          <Text style={styles.username}>
                            Admin
                            <Text style={styles.time}>
                              .{`${new Date(post.createdAt).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}`}
                            </Text>
                          </Text>
                        </View>
                        <Text style={styles.title}>
                          Collaborations & Partnerships
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* message */}
                  <View style={styles.messageContainer}>
                    <Text style={styles.description}>{post.Title}</Text>
                  </View>

                  {post.ImgURL !== null && post.ImgURL !== undefined && (
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.postImage}
                        source={{ uri: `${BASE_URL}/posts/image/${post.ImgURL}` }}
                      />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darker overlay
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10, // Higher elevation for a more prominent shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    button: {
        flex: 1,
        // borderWidth: 1,
        // padding: 4,
        borderColor: '#eaeaea',
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 5,
    },
    modalDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    modalOptions: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
        flex: 1,
    },
    removeButton: {
        borderBottomWidth: 0,
    },
    modalCloseButton: {
        padding: 15,
        // backgroundColor: '#F1F1F1',
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        color: '#DD644A',
        fontWeight: '600',
    },
    postContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,  
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    nameLikeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameImgContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
    },
    nameTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    username: {
        fontFamily: 'Raleway-SemiBold',
        color: '#1E1E1E',
        fontSize: 16
    },
    time: {
        fontFamily: 'Sora-SemiBold',
        color: '#8C8B8B',
        fontSize: 14,
    },
    title: {
        fontFamily: 'Rubik-Medium',
        color: '#DD644A',
        fontSize: 14
    },
    likeDeleteContainer: {
        flexDirection: 'column',
        width: 50,
        justifyContent: 'center',
    },
    deleteIconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
        left: 5,
    },
    kebabIcon: {
        transform: [{ rotate: '90deg' }],
    },
    likeIconContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        bottom: 7,
    },
    likesCount: {
        fontFamily: 'Lato-Regular',
        color: "#F9595F",
        fontWeight: '700',
    },
    messageContainer: {
        padding: 14,
    },
    description: {
        color: "#3C404B",
        fontFamily: 'Urbanist-Bold',
        fontSize: 17,
    },
    imageContainer: {
        marginTop: 10,
    },
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 6
    },
    sidebarContainer: {
        padding: 3,
    },
    sidebar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#c5c4c4',
        borderRadius: 6,
    },
    likeButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    likedButton: {
        flex: 1,
        padding: 4,
        backgroundColor: '#F9595F',
        
    },
    posticon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        fontSize: 14,
        color: '#434752',
    },
    likedText: {
        color: "#FFFFFF",
    },
    likeIcon: {
        marginTop: 2,
    },
    likedIcon: {
        marginTop: 2,
        color: "#FFFFFF",
    },
    sendButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
    },
    shareButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    shareIcon: {
        marginTop: 2,
    },
});

