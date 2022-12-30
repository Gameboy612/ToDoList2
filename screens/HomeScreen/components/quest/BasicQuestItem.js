import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import * as api from "../../../../scripts/api"


export default function BasicQuestItem(props) {
    const dateDueColor = '#ffb7c0'
    const dateRegularColor = "#d5fcff"

    const index = props.index
    const [card, setCard] = useState(props.card)

    const [progressCurrent, setProgressCurrent] = useState(card.progress.current)
    const [progressMax, setProgressMax] = useState(card.progress.max)

    const [isCompleted, setIsCompleted] = useState(progressCurrent >= progressMax)
    const [isHour12, setIsHour12] = useState(false)
    const [dateColor, setDateColor] = useState(getDateColor)
    
    const navigation = props.navigation

    function updateIsCompleted() {
        setIsCompleted(progressCurrent >= progressMax)
    }

    function getDateColor() {
        return new Date(card.date.due_date) < new Date() ? dateDueColor : dateRegularColor
    }

    
    useEffect(()=>{
        async function fetchData() {
            const newcard = await api._getData(index)
            setDateColor(new Date(newcard.date.due_date) < new Date() ? dateDueColor : dateRegularColor)
            setCard(newcard)
            // Refresh Data
            setProgressCurrent(newcard.progress.current)
            setProgressMax(newcard.progress.max)
            setIsCompleted(newcard.progress.current >= newcard.progress.max)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
          });
      
          return unsubscribe;
	}, [navigation])

    return (
        <View style={styles.quest_wrapper}>
            <View style={styles.quest_box}>
                <View style={styles.quest_flexdir}>
                    <View style={styles.image_box}>
                        <Image style={styles.image} source={require('../../../../assets/icon.png')} />
                    </View>
                    
                    <View style={styles.text_box}>

                        {/* {Quest Name} */}
                        <View>
                            <Text style={styles.title}>{card.task}</Text>
                        </View>

                        {/* {Line} */}
                        <View style={styles.line}></View>

                        {/* {Quest Reward} */}
                        <View style={styles.reward_wrapper}>
                            <View style={[styles.quest_flexdir, {justifyContent: 'space-between'}]}>
                                <Text>
                                    <Text style={styles.point_text}>{card.points}</Text>
                                    <Text style={styles.point_symbol}> PPt</Text>
                                </Text>
                                

                                {/* Add Progress */}
                                <TouchableOpacity
                                    onPress={
                                        async () => {
                                            if(!isCompleted) {
                                                await api.changeProgress(index)  
                                                setIsCompleted(progressCurrent + 1 >= progressMax)
                                                setProgressCurrent(progressCurrent + 1)
                                            }
                                        }
                                    }
                                    onLongPress={
                                        async () => {
                                            if(!isCompleted) {
                                                await api.setProgress(index, progressMax)  
                                                setIsCompleted(true)
                                            }
                                        }
                                    }
                                    disabled={isCompleted}
                                    >
                                    <Text style={[
                                        styles.progress_text,
                                        isCompleted ?
                                        {
                                            fontSize: 16,
                                            color: '#eee'
                                        } :
                                        {
                                            fontSize: 24,
                                            color: '#cff'
                                        }
                                    ]}>{isCompleted ? 'Completed' : (progressCurrent.toString() + '/' + progressMax.toString())}</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                        {/* {Due Date} */}
                        {
                            card.date.due_date != null &&
                            <Text>
                                {
                                    true && <Text style={{color:"white"}}>Due: </Text>
                                }
                                <Text style={{color: dateColor}}>{new Date(card.date.due_date).getDate().toString()}/{(new Date(card.date.due_date).getMonth() + 1).toString()}
                                
                                {
                                    new Date(card.date.due_date).getFullYear() != new Date().getFullYear() ?
                                    "/" + new Date(card.date.due_date).getFullYear().toString()
                                    :
                                    ""
                                }
                            
                                </Text>
                                
                                {
                                    !card.date.full_day && <Text style={{color: dateColor}}>{"  "}
                                        {
                                            new Date(card.date.due_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: isHour12 })
                                        }
                                    </Text>
                                }
                                
                                
                            
                            </Text>
                        }
                    </View>

                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create(
    {
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
            fontSize: 14
        },
        progress_text: {
            lineHeight: 30
        }
    }
)