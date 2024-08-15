import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";

export default function RulesandTerms() {

    const [isSelected, setisselected] = useState(false);

    const handleRememberMeToggle = () => {
        setisselected(!isSelected);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.rulesandterms}>
                <View style={styles.rulesandtermscontainer}>
                    <View style={styles.header}>
                        <Text>Rules and Terms</Text>
                    </View>
                    <View style={styles.text}>
                        <Text>HELLO</Text>
                    </View>
                </View>
                <View style={styles.acceptcontainer}>
                    <View style={styles.acceptcheckbox}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={handleRememberMeToggle}
                        />
                        <Text>I have read and agree to the terms and conditions as well as the privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    rulesandterms: {

    },
    rulesandtermscontainer: {

    },
    header: {

    },
    text: {

    },
    acceptcontainer: {

    },
    acceptcheckbox: {

    },
    button: {

    }
});
