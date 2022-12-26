import { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity, Button, Platform } from 'react-native'
import InputCardData from './InputCardData'
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function InputCard(props) {
    const dateDueColor = '#ffb7c0'
    const dateRegularColor = "#d5fcff"
    
    const [isCompleted, setIsCompleted] = useState(props.task.progress.current >= props.task.progress.max)
    const [isHour12, setIsHour12] = useState(false)
    const [dateColor, setDateColor] = useState(props.task.date.due_date < new Date() ? dateDueColor : dateRegularColor)

    const { title, setTitle, point, setPoint, progress, setProgress, maxProgress, setMaxProgress, date, setDate} = InputCardData()

    var _addData = async (data) => {
        try {
            let olddata = await AsyncStorage.getItem("@ToDoList:task");
            if(olddata == null) {
                await AsyncStorage.setItem(
                    "@ToDoList:task",
                    "[]"
                );
            }
            
            await AsyncStorage.setItem(
                "@ToDoList:task",
                JSON.stringify([...JSON.parse(olddata), data])
            )
        } catch (error) {
        // Error saving data
        alert('error')
        }
    };

    var _getData = async () => {
        try {
            let olddata = await AsyncStorage.getItem("@ToDoList:task");
            if(olddata == null) {
                await AsyncStorage.setItem(
                    "@ToDoList:task",
                    "[]"
                );
                return "[]"
            }
            return olddata
        }
        catch(error) {
            alert(error)
        }
    }


    async function doneButton() {
        console.log("Title:" + title)
        await _addData({
            tag:["Daily"],
            task: title == null ? "Lorem Ipsum" : title,
            progress: {current: progress == null ? 0 : progress, max: maxProgress == null ? 1 : maxProgress},
            points: point == null ? 25 : point,
            date: {
                due_date: date,
                full_day: false
            }})
        // await _addData({tag: ["Daily"], task: "Clean House", progress: {current: 0, max:1}, points: 25, date:{due_date:2672048923895 , full_day: false}})
        
        console.log(await _getData())
        
        props.navigation.popToTop()
        // props.navigation.push('Home');
    }
    
    return (
        <>
        <View style={styles.done_button}>
            <TouchableOpacity style={styles.button_presser} onPress={doneButton}>
                <Text style={styles.done_text}>Done</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.quest_wrapper}>
            <View style={styles.quest_box}>
                <View style={styles.quest_flexdir}>
                    <View style={styles.image_box}>
                        <Image style={styles.image} source={require('../../../../assets/icon.png')} />
                    </View>
                    
                    <View style={styles.text_box}>

                        {/* {Quest Name} */}
                        <View>
                            <TextInput style={styles.title} autoFocus value={title} onChangeText={(text) => setTitle(text)} placeholderTextColor={ "#dadada" } placeholder={"Title"}/>
                        </View>

                        {/* {Line} */}
                        <View style={styles.line}></View>

                        {/* {Quest Reward} */}
                        <View style={styles.reward_wrapper}>
                            <View style={[styles.quest_flexdir, {justifyContent: 'space-between'}]}>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                    <TextInput style={styles.point_text} keyboardType="number-pad" value={point == null || isNaN(point.toString()) ? null : point.toString()} onChangeText={(text) => setPoint(parseInt(text))} placeholder={"25"}/>
                                    {/* <Text style={styles.point_text}>{props.task.points}</Text> */}
                                    <Text style={styles.point_symbol}> PPt</Text>
                                </View>
                                <View style={[
                                    styles.progress_text,
                                    {
                                        fontSize: 16,
                                        color: '#eee',
                                        flexDirection: 'row'
                                    }
                                ]}>
                                    <TextInput
                                        style={[
                                                styles.progress_text,
                                                {
                                                    fontSize: 24,
                                                    lineHeight: 40,
                                                    color: '#cff',
                                                    padding: 0,
                                                    margin: 0,
                                                }
                                            ]}
                                        keyboardType="number-pad"
                                        defaultValue={progress == null || isNaN(progress.toString()) ? null : progress.toString()}
                                        onChangeText={(text) => setProgress(parseInt(text))}
                                        placeholder={"0"}
                                        placeholderTextColor="#add"
                                        />
                                    <Text style={[
                                        styles.progress_text,
                                        {
                                            fontSize: 24,
                                            lineHeight: 40,
                                            color: '#cff'
                                        }
                                        ]}>/ </Text>
                                    <TextInput
                                        style={[
                                                styles.progress_text,
                                                {
                                                    fontSize: 24,
                                                    lineHeight: 40,
                                                    color: '#cff',
                                                    padding: 0,
                                                    margin: 0,
                                                }
                                            ]}
                                        keyboardType="number-pad"
                                        value={maxProgress == null || isNaN(maxProgress.toString()) ? null : maxProgress.toString()}
                                        onChangeText={(text) => setMaxProgress(parseInt(text))}
                                        placeholder={"1"}
                                        placeholderTextColor="#add"
                                        />
                                </View>
                                
                            </View>
                        </View>

                        {/* {Due Date} */}
                        <TouchableOpacity style={{width:"100%", height:30}} onPress={() => alert("This feature is WIP.")}>
                            <Text>
                                {
                                    true && <Text style={{color:"white"}}>Due: </Text>
                                }
                                <Text style={{color: dateColor}}>{date.getMonth()}/{date.getDay()}
                                
                                {
                                    date.getFullYear() != new Date().getFullYear() ?
                                    "/" + date.getFullYear().toString()
                                    :
                                    ""
                                }
                            
                                </Text>
                                
                                {
                                    !props.task.date.full_day && <Text style={{color: dateColor}}>{"  "}
                                        {
                                            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: isHour12 })
                                        }
                                    </Text>
                                }
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>

        </View>
        </>
    )
}


const styles = StyleSheet.create(
    {
        done_button: {
            marginTop: 20,
            marginRight: 25,
            alignSelf: 'flex-end',
            width: 80,
            height: 40,
            backgroundColor: '#aaa',
            borderRadius: 5
        },
        button_presser: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        done_text: {
            position: 'absolute',
            fontSize: 20,
            alignItems: 'center',
            color: 'white'
        },
        quest_wrapper: {
            width: '100%',
            paddingHorizontal: 25,
            paddingVertical: 10
        },
        quest_box: {
            paddingVertical: 8,
            backgroundColor: '#aaa',
            justifyContent: 'space-around'
        },
        quest_flexdir: {
            width: '100%',
            flexDirection: 'row'
        },
        image_box: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            flex: 1,
            paddingLeft: 15,
            paddingRight: 5,
        },
        text_box: {
            justifyContent: 'space-around',
            paddingVertical: 8,
            paddingHorizontal: 20,
            flex: 3
        },
        title: {
            flexWrap: 'wrap',
            color: 'white',
            fontSize: 18
        },
        image: {
            height: 70,
            width: 70
        },
        line: {
            width: '100%',
            height: 3,
            backgroundColor: '#fff'
        },

        reward_wrapper: {
            paddingTop: 5, 
            paddingBottom: 10 
        },

        point_text: {
            flexWrap: 'wrap',
            color: 'white',
            lineHeight: 30,
            fontSize: 26
        },

        point_symbol: {
            flexWrap: 'wrap',
            color: 'white',
            lineHeight: 30,
            fontSize: 14
        },
        progress_text: {
            lineHeight: 30
        }
    }
)