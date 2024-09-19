import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function Contact() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtonContainer}>
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Contact Us</Text>
                    <Text style={styles.headerSubtitle}>Need assistance? Contact us below, and we'll respond promptly.</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Full name</Text>
                        <View style={styles.nameInputContainer}>
                            <View style={styles.firstNameInput}>
                                <TextInput placeholder="First name" />
                            </View>
                            <View style={styles.lastNameInput}>
                                <TextInput placeholder="Second name" />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Phone number</Text>
                        <TextInput
                            placeholder="Phone number"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Message</Text>
                        <View style={styles.messageInputContainer}>
                            <TextInput placeholder="Message" style={styles.messageInput} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 210,
    },
    headerButtonContainer: {
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    sendButton: {
        marginRight: 18,
    },
    sendButtonText: {
        fontFamily: 'Sora-Medium',
        color: '#DD644A',
        fontSize: 19,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Sora-Medium',
        color: '#434752',
        fontSize: 34,
        marginBottom: 8,
    },
    headerSubtitle: {
        color: '#6D6D6D',
        fontSize: 12,
    },
    formContainer: {
        flex: 2,
        paddingRight: 15,
        paddingLeft: 5,
    },
    inputContainer: {
        marginVertical: 15,
    },
    inputWrapper: {
        marginLeft: 15,
    },
    inputLabel: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        color: '#2F3C4F',
        marginBottom: 13,
    },
    nameInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    firstNameInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '90%',
    },
    lastNameInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '90%',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    messageInputContainer: {
        height: '70%',
    },
    messageInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '100%',
        paddingHorizontal: 14,
        paddingTop: 14,
        textAlignVertical: 'top',
    },
});
