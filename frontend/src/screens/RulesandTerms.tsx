import React, { useEffect, useState } from "react";
import { GestureResponderEvent, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";
import Button from "../components/Button";
import Toast from "react-native-toast-message";


interface rulesinter {
    onPress: () => void;
}

const RulesandTerms: React.FC<rulesinter> = ({onPress}) => {

    const [isSelected, setisselected] = useState(false);
    
    const handleClick = () => {
        if (isSelected){
            onPress();
        }
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
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
            <Toast />
            <View style={styles.rulesandterms}>
                <View style={styles.rulesandtermscontainer}>
                    <View style={styles.header}>
                        <Text style={styles.rulesandtermstext}>Terms & Conditions</Text>
                    </View>
                    <View style={styles.text}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.textContainer}>
                        <Text style={styles.text2}>
                            <Text style={styles.bold}>1. Introduction:</Text> {"\n\n"} PhenX is a cutting-edge digital mobile application solution tailored specifically for university campuses, designed to bridge connections among students. Through this app, students can easily reach out to one another and share services, fostering collaboration, support, and a sense of belonging within the campus community. As such, PhenX provides Users with a service that allows them to upload and store posts, comments, reactions, photos, videos, and other information related to their engagement in a community-based approach. The app is based on the principle of free participation of internet users and freedom of expression, to ask what they need and offer what they can. It is specified that ALL POSTS/REVIEWS/COMMENTS/ and other content PUBLISHED ON THE app ARE BASED ON USERS EXPERIENCE AND ARE COMPLETELY INDEPENDENT. By registering and using the PhenX app, you agree to comply with these terms and conditions, as well as any applicable laws and regulations.
                            {"\n\n"}<Text style={styles.bold}>2. Definitions:</Text> 
                            {"\n\n-"} App: Refers to the PhenX mobile application.
                            {"\n-"} User: Any individual who has registered and created an account on PhenX including advertisers.
                            {"\n-"} Content: Any material, post or message, including text, images, videos, and other forms of media, that users upload or share on the app.
                            {"\n-"} Advertiser: Any entity that holds a partner account on PhenX and provides services or content through the app.
                            {"\n\n"}<Text style={styles.bold}>3. Governing law:</Text> {"\n\n"} These terms and conditions are governed by and construed in accordance with the laws of Morocco. Any legal actions or proceedings arising from the use of the app shall be brought in the courts of Morocco.
                            {"\n\n"}<Text style={styles.bold}>4. Registration:</Text> 
                            {"\n\n-"} Users must be at least 17 years old and students of Mohamed VI Polytechnic University, abbreviated as UM6P in Benguerir, Morocco, to register and use the app.
                            {"\n-"} PhenX does not wish to collect information about individuals under 17 years of age. When necessary, PhenX explicitly warns minors not to send any personal information to PhenX. If parents or legal guardians discover that children under their supervision have sent personal data to PhenX, we ask them to contact us to have this information deleted. We will then ensure the deletion of this data.
                            {"\n-"} A User may not hold more than one account on the app. The User acknowledges that they are solely responsible for maintaining the confidentiality of their username and password, necessary for using the app’s services.
                            {"\n-"} Registration consists of the User filling out an online form. Certain responses are mandatory, and acceptance of these general terms of use is necessary to validate registration.
                            {"\n-"} Users are responsible for providing accurate and up-to-date information during registration.
                            {"\n-"} PhenX reserves the right to verify the accuracy of the information provided and to reject or terminate any account that does not comply with these terms.
                            {"\n-"} In any case, PhenX is solely authorized to decide on the accepted and rejected registrations, without any possible recourse or compensation of any kind.
                            {"\n-"} PhenX must be able to verify the accuracy of the information provided by the User.
                            {"\n-"} By completing the registration process, the User agrees that PhenX may contact them to verify and/or update the personal information provided. The User also agrees to regularly update this information to ensure it remains complete and accurate.
                            {"\n\n"}<Text style={styles.bold}>5. User responsibilities:</Text> 
                            {"\n\n-"} Respectful behavior: Treat all users with respect. Harassment, discrimination, or bullying will not be tolerated.
                            {"\n-"} Content posting: Users are solely responsible for the content they upload. Content must comply with applicable laws and not infringe on the rights of others. Any content published on the app is necessarily public, so anyone registered on the app can view it. Any User, therefore, interacts on the PhenX mobile app under their sole responsibility, in accordance with applicable laws and regulations. Any post published on the app is certified by the User who is its author as stemming from their real consumer experience.
                            {"\n-"} Personal information: Users should not share personal information publicly and must respect the privacy of others.
                            {"\n-"} Compliance with laws: Users must adhere to all relevant laws and regulations while using the app. The User is prohibited from publishing on the app any Content, and in particular, without limitation, any information, data, sign, signal, writing, message, text, sound, music, graphic, drawing, image, photograph, video: Infringing on the intellectual property rights of PhenX or third parties; Infringing on the personal rights of third parties in case of advertisement, particularly privacy, secrecy of correspondence, honor, or consideration (defamation, insults, disparagement, etc.); Infringing on the provisions relating to the protection of personal data; Infringing on the integrity of PhenX resources, particularly PhenX’s data; Infringing on the interests of PhenX ; Racist, violent, or pornographic content, contrary to respect for human dignity, campus student life, and the protection of minors, and more generally, content contrary to law, morality, or public order; The reported Content will be removed after verification (article 12), and/or the User’s account will be deleted without prior notice (article 11). Furthermore, any User personally risks specific penalties for illegal Content (imprisonment and fines) beyond potential liability for damages in accordance with Moroccan law.
                            {"\n\n"}<Text style={styles.bold}>6. User conduct and prohibited activities:</Text> {"\n\n"} Users agree not to engage in any unlawful activities, including but not limited to, spamming, hacking, spreading malware, or engaging in activities that infringe on the rights of others. Users also agree not to upload content that is defamatory, offensive, or violates any laws.
                            {"\n\n"}<Text style={styles.bold}>7. Dispute resolution:</Text> {"\n\n"}In the event of a dispute arising from the use of the app, users agree to first attempt to resolve the issue through informal negotiation with PhenX. If the dispute cannot be resolved, it will be subject to arbitration in accordance with Moroccan law.
                            {"\n\n"}<Text style={styles.bold}>8. Indemnification:</Text> {"\n\n"} Users agree to indemnify and hold PhenX and its affiliates, employees, and partners harmless from any claims, damages, liabilities, costs, or expenses (including attorney fees) arising from their use of the app or violation of these terms.
                            {"\n\n"}<Text style={styles.bold}>9. Content ownership and licensing:</Text>
                            {"\n\n-"} Users retain ownership of the rights to the content they post.
                            {"\n-"} By posting content on the app, users grant PhenX an exclusive, worldwide, royalty-free license to reproduce, distribute, perform, use, modify, and display the content for any purpose, including commercial purposes, without limitation or restriction. Anonymity will be respected if requested.
                            {"\n-"} The User also agrees that, in order to deliver the app's content to other users, PhenX may (a) share or distribute their Content across different public networks and through various types of media, and (b) make necessary adjustments to their Content so it works properly with different networks, devices, or media formats.
                            {"\n\n"}<Text style={styles.bold}>10. Advertiser responsibilities:</Text> {"\n\n"} Advertisers must provide accurate and lawful content. Any promotion or advertising must be authorized by PhenX.
                            {"\n\n"}<Text style={styles.bold}>11. Account termination:</Text> 
                            {"\n\n-"} By PhenX: PhenX reserves the right to terminate or suspend user accounts in cases of violation of these terms, non-compliance with laws, or any other actions deemed harmful to the app's integrity.
                            {"\n-"} By User: Users may request the deletion of their account at any time by contacting PhenX support.
                            {"\n\n"}<Text style={styles.bold}>12. Liability of PhenX:</Text> 
                            {"\n\n-"} PhenX operates as a hosting service provider and assumes no responsibility for the Content uploaded and published by Users. PhenX is not responsible for the accuracy or legality of any Content on the app.
                            {"\n-"} PhenX does not guarantee that the app will be available at all times or without interruption.
                            {"\n-"} PhenX may, at its discretion, suspend, interrupt, or discontinue the services offered without notice.
                            {"\n-"} PhenX shall not be held liable for any damages resulting from the use or inability to use the app, including but not limited to, any loss of data or profits, or any other consequential or incidental damages.
                            {"\n-"} PhenX is not responsible for any financial transactions, agreements, or exchanges that take place between users on the app.
                            {"\n-"} PhenX cannot be held responsible for the actions, behavior, or conduct of its users. While the app encourages respectful and cooperative interactions, it does not have control over individual behavior and is not liable for any harm or disputes arising from user interactions.
                            {"\n-"} The app holds no responsibility for any disruptions in service, including technical issues, server downtime, or maintenance periods that may affect user access or functionality.
                            {"\n\n"}<Text style={styles.bold}>13. Intellectual property:</Text> 
                            {"\n\n-"} The app and all its components (texts, photos, videos, images, sounds, drawings, data, etc.) are the exclusive property of PhenX or are used with the authorization of the rights holders. The User does not acquire any intellectual property rights over the app or its components, which remain the property of PhenX.
                            {"\n-"} Any use of the app, and any Content, information, or data present on the app, for commercial or non-commercial purposes, by any means whatsoever, is strictly prohibited without the prior and written consent of PhenX. Unauthorized use may result in legal action, including claims for damages.
                            {"\n\n"}<Text style={styles.bold}>14. Content management and moderation:</Text> 
                            {"\n\n-"} PhenX reserves the right to moderate or remove any content that violates these terms or any applicable laws without prior notice to the user.
                            {"\n-"} Users agree to notify PhenX of any inappropriate content or violations of these terms they encounter.
                            {"\n\n"}<Text style={styles.bold}>15. Privacy policy:</Text> {"\n\n"} Users' personal information will be handled in accordance with PhenX's privacy policy, which outlines how data is collected, used, and protected.
                            {"\n\n"}<Text style={styles.bold}>16. Changes to terms:</Text> 
                            {"\n\n-"} PhenX reserves the right to modify or update these terms at any time. Users will be notified of any significant changes via email or in-app notifications.
                            {"\n-"} Continued use of the app after any such changes constitutes acceptance of the new terms.
                            {"\n\n"}<Text style={styles.bold}>17. Contact information:</Text> {"\n\n"} Users can reach out to PhenX support with any questions or concerns at the contact information provided within the app.
                            {"\n\n"}<Text style={styles.bold}>18. General provisions:</Text> 
                            {"\n\n-"} These terms constitute the entire agreement between the user and PhenX regarding the use of the app.
                            {"\n-"} If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                            {"\n-"} The failure of PhenX to enforce any right or provision of these terms shall not be deemed a waiver of such right or provision.
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
                        <Text style={styles.accept}>I have read and agree to the terms and conditions as well as the privacy policy</Text>
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
        padding: 5,
        alignItems: 'flex-start'
    },
    accept: {
        color: '#434752',
    },
    bold: {
        fontWeight: 'bold',
        color: '#40444E',
        fontSize: 17
    },
});

export default RulesandTerms;