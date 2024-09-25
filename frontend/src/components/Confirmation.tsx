import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Iconfont from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/AntDesign';



export default function Confirmation() {
    return (
        <Modal animationType="fade" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.topSection}>
                <TouchableOpacity style={styles.closeButton}>
                  <Iconfont name="remove" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Service Confirmation</Text>
              </View>
    
              <View style={styles.divider} />
    
              <View style={styles.contentSection}>
                <Text style={styles.description}>
                  Please confirm if you have completed the service.
                </Text>
    
                <View style={styles.feedbackSection}>
                  <Text style={styles.feedbackLabel}>Leave Feedback</Text>
                  <TextInput
                    style={styles.feedbackInput}
                    placeholder="Share your feedback here..."
                    multiline
                  />
                </View>
    
                <View style={styles.buttonSection}>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Yes</Text>
                    <IconIon name="circledowno" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>No</Text>
                    <Iconfont name="remove" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
      },
      topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      closeButton: {
        padding: 8,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: 16,
      },
      contentSection: {
        alignItems: 'center',
      },
      description: {
        fontSize: 16,
        marginBottom: 16,
      },
      feedbackSection: {
        marginVertical: 16,
      },
      feedbackLabel: {
        fontSize: 16,
        marginBottom: 8,
      },
      feedbackInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        textAlignVertical: 'top',
      },
      buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      buttonText: {
        fontSize: 16,
        marginRight: 8,
      },
    });
    