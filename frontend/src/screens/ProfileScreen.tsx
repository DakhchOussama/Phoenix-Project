import React from "react";
import { Image, Text, View } from "react-native";
import Iconfont from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';



export default function ProfileScreen(){
    return (
        <View>
            <View>

            <View>

                <View>
                    <Text>Your Profile</Text>
                    {/* <LeftBar /> */}
                </View>

                <View>
                    <Image source={require('../assets/profile.png')} style={{width: 15, height: 15}} />
                    <View>
                        <View>
                            <Text>Anna Jones</Text>
                            {/* iCON */}
                        </View>

                        <View>
                            <Iconfont name="email" />
                            <Text>randome@gmail.com</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View>
                <View>
                    <Icon name="setting" />
                    <Icon name="sharealt" />
                </View>

                <View>
                    <Text>Personal Info</Text>
                    <Text>You can change your personal information settings here</Text>
                </View>
            </View>

            </View>

            <View>
                <View>
                    <View>
                        <Text>Details</Text>
                    </View>

                    <View>
                        <Text>User Activity</Text>
                    </View>
                </View>

                {/* Details */}

                <View>
                    <View>
                        <Text>Username</Text>
                        <View>
                            <Text>Anna Jones</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Phone number</Text>
                        <View>
                            <Text>0600721995</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Email</Text>
                        <View>
                            <Text>randommail@gmail.com</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Department</Text>
                        <View>
                            <Text>1337</Text>
                        </View>
                    </View>
                </View>

                {/* User Activity */}
                <View>
                    <View>
                        <View>
                            <Image source={require('../assets/upload.png')} style={{width: 15, height: 15}} />
                        </View>

                        <View>
                            <Text>10</Text>
                            <Text>Offers Uploaded</Text>
                        </View>
                    </View>

                    {/* 2 */}

                    <View>
                        <View>
                            <Icon name="shoppingcart" />
                            
                        </View>

                        <View>
                            <Text>5</Text>
                            <Text>Demands Uploaded</Text>
                        </View>
                    </View>

                    {/* 3 */}

                    <View>
                        <View>
                            <Image source={require('../assets/peace.png')} style={{width: 15, height: 15}} />
                            
                        </View>

                        <View>
                            <Text>45</Text>
                            <Text>Likes Received</Text>
                        </View>
                    </View>

                    {/* 4 */}

                    <View>
                        <View>
                            <Image source={require('../assets/grouping.png')} style={{width: 15, height: 15}}/>
                        </View>

                        <View>
                            <Text>150</Text>
                            <Text>Followers Count</Text>
                        </View>
                    </View>


                </View>
            </View>


        </View>
    )
}