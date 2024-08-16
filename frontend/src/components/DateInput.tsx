import React, {useEffect, useState} from 'react';
import { TextInput, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';


interface DateInputInterface  {
    date: Date;
    open: boolean;
    setOpen: (value : boolean) => void;
    setDate: (value : Date) => void;
    already: boolean;
    setalready: (value: boolean) => void;
}

const DateInput: React.FC<DateInputInterface> = ({ date, open, setOpen, setDate, already, setalready }) => {

    const formatDate = () => {
        if (already){
            return date.toLocaleDateString();
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} style={[styles.textInput, {flex: 2, marginBottom: 0 }]}>
                <TextInput
                    style={{color: "#434752"}}
                    placeholderTextColor="#434752"
                    placeholder="Birthday"
                    value={formatDate()}
                    editable={false}
                />
                </TouchableOpacity>
                <Icon name="calendar" size={20} style={styles.icon} color="#9A9A9A" />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                        setalready(true);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    mode="date"
                />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#9A9A9A',
    },
    text: {
        color: "#434752",
    },
    icon: {
        position: 'absolute',
        right: 0
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#9A9A9A',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 0,
        marginBottom: 35
    }
});

export default DateInput;
