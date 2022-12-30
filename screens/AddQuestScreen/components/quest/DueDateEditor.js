import { useState } from "react";

import { TouchableOpacity, Text, Platform, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';


export default function DueDateEditor(props) {
    const dateColor = props.dateColor
    const date_DueDate = props.date_DueDate
    const setDate_DueDate = props.setDate_DueDate
    const date_FullDay = props.date_FullDay
    const isHour12 = props.isHour12


    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    /* Refer to:
        https://github.com/react-native-datetimepicker/datetimepicker
    */

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate_DueDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };





    return (
        <>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date_DueDate}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                />
            )}

                <View style={{flexDirection:"row"}}>
                    <Text style={{color:"white"}}>Due: </Text>
                    <TouchableOpacity onPress={showDatepicker}>
                            <Text style={{color: dateColor}}>{typeof date_DueDate.getMonth === 'function' ? date_DueDate.getDate() : new Date().getDate()}/{typeof date_DueDate.getMonth === 'function' ? date_DueDate.getMonth() + 1 : new Date().getMonth() + 1}
                            
                            {
                                typeof date_DueDate.getFullYear === 'function'
                                ?
                                (
                                    date_DueDate.getFullYear() != new Date().getFullYear()
                                    ?
                                    "/" + date_DueDate.getFullYear().toString()
                                    :
                                    ""
                                )
                                :
                                ""
                            }
                        
                            </Text>
                    </TouchableOpacity>
                    
                    {
                        !date_FullDay &&
                        <TouchableOpacity onPress={showTimepicker}>
                                <Text style={{color: dateColor}}>{"  "}
                                    {
                                        typeof date_DueDate.getFullYear === 'function'
                                        ?
                                        date_DueDate.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })
                                        
                                        :
                                        "no data found"
                                    }
                                </Text>
                        </TouchableOpacity>
                    }
                </View>

        </>
        
    )

}