
import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const DatePicker = ({ titulo, guardarEstado, fecha }) => {

    const [date, setDate] = useState(fecha ? fecha : new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        guardarEstado(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView>
            <Button onPress={showDatepicker} title={titulo} />
            <Text>{date?.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    );
}

export default DatePicker

const styles = StyleSheet.create({})

