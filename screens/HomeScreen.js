import { useState, useEffect } from 'react';
import BasicQuestItem from './HomeScreen/components/quest/BasicQuestItem';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';


const width = Dimensions.get("screen").width

export default function HomeScreen({ navigation }) {
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
    
    

    const [taskItems, setTaskItems] = useState([])

    const [ascending, setAscending] = useState(true)

    const [searchTags, setSearchTags] = useState(
        []
    )



    useEffect(()=>{
        
        async function fetchData() {
            // await AsyncStorage.setItem(
            //     "@ToDoList:task",
            //     "[]"
            // );
            // await _addData({tag: ["Daily"], task: "Clean House", progress: {current: 0, max:1}, points: 25, date:{due_date:2672048923895 , full_day: false}})
            console.log('loading data')
            setTaskItems(JSON.parse(await _getData()))
        }
        

        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
            //Put your Data loading function here instead of my loadData()
          });
      
          return unsubscribe;
	}, [navigation])



    console.log(taskItems)




    return (
        <View>
            <ScrollView
                decelerationRate={0.85}
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false} 
                overScrollMode='never'
                style={styles.screen_wrapper}
            >
                <View style={styles.inner_padding}>
                {
                    [...taskItems].sort((a,b) => {return a ? (a.date.due_date - b.date.due_date) * (ascending * 2 - 1) : 0}).map(
                        (item, index) => {
                            var remove = false
                            searchTags.forEach(
                                tag => {
                                    if(!item.tag.includes(tag)) remove = true
                                }
                            )
                            if(!remove) return (
                                <BasicQuestItem key={index} task={item}/>
                            )
                        }
                    )
                }

                </View>
            </ScrollView>
            <View style={styles.add_button}>
                <TouchableOpacity style={styles.button_presser} onPress={() => {
                    navigation.navigate("AddQuest", {})
                }}>
                    <View style={styles.circular}>
                    </View>
                    <Text style={styles.plus_sign}>+</Text>
                </TouchableOpacity>
            </View>
            
        </View>
            
    )
}

const styles = StyleSheet.create(
    {
        screen_wrapper: {
            width: width,
            height: '100%'
        },
        inner_padding: {
            paddingVertical: 20
        },
        add_button: {
            position: 'absolute',
            right: 20,
            bottom: 20,
            width: 60,
            height: 60,
        },
        button_presser: {
            width: '100%',
            height: '100%',
            alignItems: 'center'
        },
        circular: {
            width: '100%',
            height: '100%',
            borderRadius: 50,
            backgroundColor: '#fff8',
            borderColor: '#0001',
            borderWidth: 5
        },
        plus_sign: {
            position: 'absolute',
            fontSize: 40
        }
    }
)