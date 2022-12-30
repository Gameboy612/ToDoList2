import { useState, useEffect } from 'react';
import BasicQuestItem from './HomeScreen/components/quest/BasicQuestItem';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';
import * as api from '../scripts/api'
import TimelineDate from './HomeScreen/components/quest/TimelineDate';


const width = Dimensions.get("screen").width

export default function HomeScreen({ navigation }) {
    const [taskItems, setTaskItems] = useState([])
    const [searchTags, setSearchTags] = useState(
        []
    )





    useEffect(()=>{
        async function fetchData() {
            // await api._resetData()
            // await api._addData({tag: ["Daily"], task: "Clean House", progress: {current: 0, max:1}, points: 25, date:{due_date:2672048923895 , full_day: false}})
            console.log('loading data')
            setTaskItems(JSON.parse(await api._getData()))
        }
        

        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
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
                    [...taskItems].map(
                        (item, index, array) => {
                            var remove = false
                            searchTags.forEach(
                                tag => {
                                    if(!item.tag.includes(tag)) remove = true
                                }
                            )
                            if(!remove) {
                                const pass_data = {card:item, index:index}
                                console.log(pass_data)
                                return (
                                <View key={index}>
                                    {
                                        /* Check if date changed */
                                        (index == 0
                                        ||
                                        new Date(array[index].date.due_date).getDate() != new Date(array[index - 1].date.due_date).getDate())
                                        &&
                                        <TimelineDate date={array[index].date.due_date} index={index} />
                                    }
                                    <TouchableOpacity
                                        
                                        onPress={() => {navigation.navigate("AddQuest", pass_data)}}
                                        >
                                        <BasicQuestItem card={item} index={index} navigation={navigation}/>
                                    </TouchableOpacity>
                                </View>
                                )
                        }
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