import React, { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import Iconfont from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import LeftBar from "../components/LeftBar";

export default function ProfileScreen() {
    const [leftbar, setLeftbar] = useState<boolean>(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {leftbar && <LeftBar 
                onPress={() => setLeftbar(false)}
                navigation={navigation} 
            />}
            <View style={styles.flexContainer}>
                

                <View style={styles.flexContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText}>Your Profile</Text>
                            <View style={styles.iconContainer}>
                                <IconFeather name="bar-chart" size={27} color="#FFFFFF" onPress={() => setLeftbar(!leftbar)} />
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <View style={{position: 'relative', bottom: 48}}>
                        <View style={{marginLeft: 40}}>
                            <Image source={require('../assets/profile.png')} style={{width: 85, height: 85, borderRadius: 50}} />
                        </View>
                        <View style={{marginLeft: 25, marginTop: 8}}>
                            <View style={{}}>
                                <Text style={{fontFamily: 'Raleway-SemiBold', fontSize: 24, color: '#434752'}}>Anna Jones</Text>
                                {/* iCON */}
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Iconfont name="email" size={16} color={'#434752'} />
                                <Text style={{fontFamily: 'Sora-Medium', marginLeft: 5, marginBottom: 2, color: '#444854'}}>randome@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                </View>

                </View>

                <View style={styles.footer}>
                    <View style={styles.iconRow}>
                        <View style={styles.iconWrapper}>
                            <Icon name="setting" size={24} color={'#434752'} />
                        </View>
                        <View style={[styles.iconWrapper, styles.shareIcon]}>
                            <Icon name="sharealt" size={23} color={'#FFFFFF'}/>
                        </View>
                    </View>

                    <View style={styles.personalInfo}>
                        <Text style={styles.personalInfoTitle}>Personal Info</Text>
                        <Text style={styles.personalInfoText}>You can change your personal information settings here</Text>
                    </View>
                </View>

            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <View style={styles.detailsTitleWrapper}>
                        <Text style={styles.detailsTitle}>Details</Text>
                    </View>
                    <View style={styles.userActivityWrapper}>
                        <Text style={styles.userActivityTitle}>User Activity</Text>
                    </View>
                </View>

                <View style={styles.detailsContent}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Username</Text>
                        <View style={styles.detailValueWrapper}>
                            <Text style={styles.detailValue}>Anna Jones</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Phone number</Text>
                        <View style={styles.detailValueWrapper}>
                            <Text style={styles.detailValue}>0600721995</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Email</Text>
                        <View style={styles.detailValueWrapper}>
                            <Text style={styles.detailValue}>randommail@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Department</Text>
                        <View style={styles.detailValueWrapper}>
                            <Text style={styles.detailValue}>1337</Text>
                        </View>
                    </View>
                </View>

                {/* User Activity */}
                {/* <View style={{}}>
                    <View style={{}}>
                        <View style={{}}>
                            <Image source={require('../assets/upload.png')} style={{width: 15, height: 15}} />
                        </View>

                        <View style={{}}>
                            <Text>10</Text>
                            <Text>Offers Uploaded</Text>
                        </View>
                    </View>


                    <View style={{}}>
                        <View style={{}}>
                            <Icon name="shoppingcart" />
                            
                        </View>

                        <View style={{}}>
                            <Text>5</Text>
                            <Text>Demands Uploaded</Text>
                        </View>
                    </View>

               

                    <View style={{}}>
                        <View style={{}}>
                            <Image source={require('../assets/peace.png')} style={{width: 15, height: 15}} />
                            
                        </View>

                        <View style={{}}>
                            <Text>45</Text>
                            <Text>Likes Received</Text>
                        </View>
                    </View>

      

                    <View style={{}}>
                        <View style={{}}>
                            <Image source={require('../assets/grouping.png')} style={{width: 15, height: 15}}/>
                        </View>

                        <View style={{}}>
                            <Text>150</Text>
                            <Text>Followers Count</Text>
                        </View>
                    </View>


                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    flexContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#434752',
        height: '60%',
        justifyContent: 'flex-start',
    },
    headerContent: {
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Sora-Medium',
        fontSize: 17,
    },
    iconContainer: {
        position: 'absolute',
        left: 5,
        padding: 5,
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    profileImageWrapper: {
        position: 'relative',
        bottom: 48
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 50,
    },
    profileInfo: {
        marginLeft: 25,
        marginTop: 8,
    },
    profileName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 24,
        color: '#434752',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        marginBottom: 2,
        color: '#444854',
    },
    footer: {
        height: 120,
    },
    iconRow: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
    },
    iconWrapper: {
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#434752',
        borderRadius: 50,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareIcon: {
        backgroundColor: '#434752',
    },
    personalInfo: {
        flex: 1,
        paddingLeft: 15,
    },
    personalInfoTitle: {
        fontFamily: 'Raleway-SemiBold',
        color: '#444854',
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 2,
    },
    personalInfoText: {
        color: '#444854',
    },
    detailsContainer: {
        flex: 1,
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#B4B4B4',
    },
    detailsTitleWrapper: {
        marginLeft: 15,
    },
    detailsTitle: {
        fontFamily: 'Raleway-Bold',
        fontSize: 18,
        color: '#434752',
    },
    userActivityWrapper: {
        marginRight: 18,
    },
    userActivityTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: '#434752',
    },
    detailsContent: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 45,
        paddingTop: 15,
    },
    detailItem: {
        flex: 1,
        flexDirection: 'column',
    },
    detailLabel: {
        fontFamily: 'Raleway-Bold',
        fontSize: 15,
        marginBottom: 10,
        color: '#5e6475',
    },
    detailValueWrapper: {
        borderWidth: 1,
        borderColor: '#CBCECE',
        marginLeft: 15,
        padding: 10,
        borderRadius: 8,
        width: 350,
        paddingLeft: 20,
    },
    detailValue: {
        color: '#434752',
    },
});
