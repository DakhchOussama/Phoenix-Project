import React, { useState } from "react";
import { Image, Switch, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Iconfeather from 'react-native-vector-icons/Feather';
import SelectionTextInput from "../../components/SelectionTextInput";
import Icon from 'react-native-vector-icons/AntDesign';
import CustomSwitch from "../../components/CustomSwitch";
import Button from "../../components/Button";


export default function Newpost(){

    const [nextpage, setnextpage] = useState(false);

    return (
        <>
                <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={{ height: 80, justifyContent: 'flex-end', alignItems: 'center',}}>
                    {!nextpage ? (
                    <View style={{ backgroundColor: '#EEEEEE', height: 13, borderRadius: 10, width: 250, marginBottom: 10 }}>
                        <View style={{ backgroundColor: '#E17861', height: 13, borderRadius: 10, width: 134 }}></View>
                    </View>
                    ) : (
                    <View style={{ backgroundColor: '#EEEEEE', height: 13, borderRadius: 10, width: 250, marginBottom: 10, alignItems: 'flex-end' }}>
                        <View style={{ backgroundColor: '#E17861', height: 13, borderRadius: 10, width: 134 }}></View>
                    </View>
                    )}
                </View>
            {!nextpage ? (
                    <>
                        
                        <View style={{flex: 2}}>
                            <View style={{justifyContent: 'center', padding: 20, flex: 1, alignItems: 'center'}}>
                                <Text style={{fontFamily: 'Raleway-Bold', fontSize: 25, color: "#434752", marginBottom: 10}}>Upload a demand or offer post</Text>
                                <Text style={{fontFamily: 'Rubik-Regular', fontSize: 12, color: "#434752", marginLeft: 7}}>Upload a clear photo showcasing the details of your demand or offer post, ensuring all information is visible and easy to read</Text>
                            </View>
            
                            <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 2}}>
            
                                {/* img upload */}
                                <View style={{backgroundColor: '#FAFAFA', height: '100%', width: 400, flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center', borderWidth: 2.5, borderColor: '#E17861', borderTopLeftRadius: 40, borderBottomLeftRadius: 40, borderTopRightRadius: 30, borderBottomRightRadius: 30}}>
                                    <Text style={{fontFamily: 'Lato-Bold', marginTop: 5, fontSize: 16, color: "#9E9E9E"}}>Select file</Text>
                                    <Iconfeather name="image" size={30} color={'#9E9E9E'} />
                                </View>
                            </View>
                        </View>
            
            
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>
                                <View style={{borderWidth: 0.3, width: 130, marginTop: 2, borderColor: '#e3e3e3'}}></View><Text style={{fontSize: 20, fontFamily: 'Lato-Bold', color: "#434752", marginLeft: 7, marginRight: 7}}>or</Text><View style={{borderWidth: 0.3, width: 130, marginTop: 2, borderColor: '#e3e3e3'}}></View>
                            </View>
            
                            <View style={{justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, flex: 1}}>
                                <View style={{flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCF0EE', width: 300, height: 50, borderRadius: 30}}>
                                    <Text style={{fontFamily: 'Raleway-Bold', color: "#E17861"}}>Open Camera & Take Photo</Text>
                                    <Iconfeather name="camera" size={18} style={{marginRight: 7, color: "#E17861"}} />
                                </View>
                            </View>
            
                            <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 2}}>
                               <Button text="Continue" onPress={() => setnextpage(true)} iconbutton={false} buttonColor="#434752" />
                            </View>
                        </View>
                    </>
            ) : (
                <View style={{flex: 1, padding: 20}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: '#434752', marginBottom: 10, fontSize: 18}}>Categories :</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 13, zIndex: 999}}>
                            <SelectionTextInput/>
                        </View>
                        
                    </View>

                    <View style={{flex: 1}}>
                        <Text style={{color: '#434752', marginBottom: 10, fontSize: 18}}>Type :</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 13, zIndex: 997}}>
                            <SelectionTextInput/>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 15}}>
                        <Text style={{color: '#434752', marginLeft: 10, fontSize: 17}}>Enable Comments</Text>
                       <CustomSwitch />
                    </View>

                    <View style={{flex: 2}}>
                        <Text style={{color: '#434752', marginBottom: 10, fontSize: 18}}>Title :</Text>

                        <View style={{flex: 1, padding: 5}}>
                            <TextInput style={{flex: 1, borderRadius: 15, borderColor: '#E17861',borderWidth: 1.5, backgroundColor: '#fcfcfc'}}></TextInput>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity style={{backgroundColor: '#434752', width: 200, height: 60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 15}}>
                                <Text style={{color: "#FFFFFF", fontFamily: 'Raleway-Bold', fontSize: 17, marginRight: 10}}>Upload</Text>
                                <Icon name="upload" size={18} style={{color: "#FFFFFF"}}/>
                            </TouchableOpacity>
                    </View>


                </View>
            )}
            </View>
        </>
    )
}