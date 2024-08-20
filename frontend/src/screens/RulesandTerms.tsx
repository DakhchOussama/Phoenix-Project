import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";
import Button from "../components/Button";
import Toast from "react-native-toast-message";

export default function RulesandTerms({navigation}: {navigation: any}) {

    const [isSelected, setisselected] = useState(false);
    
    const handleClick = () => {
        if (isSelected)
            navigation.replace('Homepage')
        else{
            Toast.show({
                type: 'info',
                text1: 'You should agree to continue',
                position: 'top',
                visibilityTime: 3000,
            });
        }
    };

    const handleRememberMeToggle = () => {
        setisselected(!isSelected);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Toast />
            <View style={styles.rulesandterms}>
                <View style={styles.rulesandtermscontainer}>
                    <View style={styles.header}>
                        <Text style={styles.rulesandtermstext}>Terms and Conditions</Text>
                    </View>
                    <View style={styles.text}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text2}>
                            <Text style={styles.bold}>Responsibility:</Text> By using this app, you agree that all content you submit is your responsibility and the app is not liable for any user-posted information.
                        {"\n\n"}<Text style={styles.bold}>Language Use:</Text> You must use respectful and appropriate language, as inappropriate content will not be tolerated.
                        {"\n\n"}<Text style={styles.bold}>Reporting:</Text> Please report any inappropriate behavior to the app administrators, who reserve the right to remove content violating our terms.
                        {"\n\n"}<Text style={styles.bold}>Privacy Policy:</Text> The app's privacy policy explains how user data is handled.
                        {"\n\n"}<Text style={styles.bold}>User Agreements:</Text> We are not responsible for user agreements or transactions; users must ensure their own safety.
                        {"\n\n"}<Text style={styles.bold}>Respectful Interaction:</Text> Respectful interaction is expected, and discrimination or harassment is prohibited.
                        {"\n\n"}<Text style={styles.bold}>Prohibited Activities:</Text> Illegal or unethical activities are not allowed.
                        {"\n\n"}<Text style={styles.bold}>Safety Tips:</Text> For exchanges, meeting in public places is recommended.
                        {"\n\n"}<Text style={styles.bold}>Disclaimer:</Text> The app is provided "as is," and we do not guarantee the accuracy of user-posted content or bear responsibility for any resulting damages.
                            </Text>
                        </View>
                    </ScrollView>
                    </View>
                </View>
                <View style={styles.acceptcontainer}>
                    <View style={styles.acceptcheckbox}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={handleRememberMeToggle}
                        />
                        <Text style={styles.accept}>I have read and agree to the terms and conditions as {"\n"} well as the privacy policy</Text>
                    </View>
                    <View style={styles.buttonaccept}>
                        <Button text="accept" onPress={handleClick} iconbutton={false} />
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    rulesandterms: {
        flex: 1
    },
    rulesandtermscontainer: {
        flex: 2,
    },
    header: {
        height: 135,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    rulesandtermstext: {
        fontSize: 30,
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        color: '#EB6F54'
    },
    text: {
        flex: 2,
        padding: 10,
    },
    acceptcontainer: {
        height: 180,
        padding: 5
    },
    acceptcheckbox: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    buttonaccept: {
        flex: 2,
        alignItems: 'center',
        
    },
    scrollView: {
        flex: 1
    },
    textContainer: {
        
    },
    scrollContent: {
        paddingVertical: 20,
    },
    text2: {
        color: '#213038',
        fontSize: 16,
        lineHeight: 24,
    },
    accept: {
        marginTop: 10,
        color: '#434752',
        fontFamily: 'Lato-Regular'
    },
    bold: {
        fontWeight: 'bold',
        color: '#000000',
    },
});
