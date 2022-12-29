import { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity, Button, Platform } from 'react-native'
import InputCardData from './InputCardData'
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function InputCard(props) {
    const dateDueColor = '#ffb7c0'
    const dateRegularColor = "#d5fcff"
    
    const [isCompleted, setIsCompleted] = useState(props.task.progress.current >= props.task.progress.max)
    const [isHour12, setIsHour12] = useState(false)
    const [dateColor, setDateColor] = useState(props.task.date.due_date < new Date() ? dateDueColor : dateRegularColor)

    var {  task, setTask, points, setPoints, progressCurrent, setProgressCurrent, progressMax, setProgressMax, date_DueDate, setDate_DueDate, date_FullDay, setDate_FullDay } = InputCardData()

    const index = props.index

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

    var _editData = async (data, i) => {
        console.log("editing index: " + i)
        try {
            let olddata = await AsyncStorage.getItem("@ToDoList:task");
            if(olddata == null) {
                await AsyncStorage.setItem(
                    "@ToDoList:task",
                    "[]"
                );
            }
            
            if(i == -1) {
                await AsyncStorage.setItem(
                    "@ToDoList:task",
                    JSON.stringify([...JSON.parse(olddata), data])
                )
            } else {
                console.log("REPLACING DATA")
                let newdata = JSON.parse(olddata)
                newdata[i] = data
                await AsyncStorage.setItem(
                    "@ToDoList:task",
                    JSON.stringify(newdata)
                )
                console.log(await _getData())
            }
        } catch (error) {
        // Error saving data
        alert('error')
        }
    }

    async function doneButton() {
        console.log("Task:" + task)
        await _editData({
            tag:["Daily"],
            task: task == null ? "Lorem Ipsum" : task,
            progress: {current: progressCurrent == null ? 0 : progressCurrent, max: progressMax == null ? 1 : progressMax},
            points: points == null ? 25 : points,
            date: {
                due_date: date_DueDate,
                full_day: date_FullDay
            }}, index)
        // await _addData({tag: ["Daily"], task: "Clean House", progress: {current: 0, max:1}, points: 25, date:{due_date:2672048923895 , full_day: false}})
        
        console.log(await _getData())
        
        props.navigation.popToTop()
        // props.navigation.push('Home');
    }

    useEffect(()=>{
        console.log("Loading card input fields")
        if(props.card) {
            const card = props.card
            console.log("Found data" + JSON.stringify(card))
            // Importing card data
            setTask(card.task)
            setProgressCurrent(card.progress.current)
            setProgressMax(card.progress.max)
            setPoints(card.points)
            setDate_DueDate(new Date(card.date.due_date))
            setDate_FullDay(card.date.full_day)
            
            console.log(task)
        }
        else {
            console.log("Generating new card")
        }
        console.log("Card generated")
	}, [])
    
    return (
        <>
        <View style={[styles.quest_flexdir, {flexDirection: 'row-reverse'}]}>
            {/* <View style={styles.delete}>
                <TouchableOpacity style={styles.button_presser} onPress={deleteButton}>
                    <Text style={styles.done_text}>Delete</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.done_button}>
                <TouchableOpacity style={styles.button_presser} onPress={doneButton}>
                    <Text style={styles.done_text}>Done</Text>
                </TouchableOpacity>
            </View>

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
                            <TextInput style={styles.task} autoFocus value={task} onChangeText={(text) => setTask(text)} placeholderTextColor={ "#dadada" } placeholder={"Task"}/>
                        </View>

                        {/* {Line} */}
                        <View style={styles.line}></View>

                        {/* {Quest Reward} */}
                        <View style={styles.reward_wrapper}>
                            <View style={[styles.quest_flexdir, {justifyContent: 'space-between'}]}>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                    <TextInput style={styles.point_text} keyboardType="number-pad" value={points == null || isNaN(points.toString()) ? null : points.toString()} onChangeText={(text) => setPoints(parseInt(text))} placeholder={"25"}/>
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
                                        defaultValue={progressCurrent == null || isNaN(progressCurrent.toString()) ? null : progressCurrent.toString()}
                                        onChangeText={(text) => setProgressCurrent(parseInt(text))}
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
                                        value={progressMax == null || isNaN(progressMax.toString()) ? null : progressMax.toString()}
                                        onChangeText={(text) => setProgressMax(parseInt(text))}
                                        placeholder={"1"}
                                        placeholderTextColor="#add"
                                        />
                                </View>
                                
                            </View>
                        </View>

                        {/* {Due Date} */}
                        <TouchableOpacity style={{width:"100%", height:30}} onPress={() => alert("This feature is WIP.")}>
                            <Text>
                                <Text style={{color:"white"}}>Due: </Text>
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
                                
                                {
                                    !props.task.date.full_day && <Text style={{color: dateColor}}>{"  "}
                                        {
                                            typeof date_DueDate.getFullYear === 'function'
                                            ?
                                            date_DueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: isHour12 })
                                            :
                                            ""
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
        task: {
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
            lineHeight: 30,
            width: 'auto'
            
        }
    }
)