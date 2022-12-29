import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet } from "react-native"


export default function BasicQuestItem(props) {
    const dateDueColor = '#ffb7c0'
    const dateRegularColor = "#d5fcff"

    const [isCompleted, setIsCompleted] = useState(props.task.progress.current >= props.task.progress.max)
    const [isHour12, setIsHour12] = useState(false)
    const [dateColor, setDateColor] = useState(getDateColor)
    
    function getDateColor() {
        return new Date(props.task.date.due_date) < new Date() ? dateDueColor : dateRegularColor
    }
    useEffect(()=>{
        
        setDateColor(getDateColor)
	}, [])

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
                            <Text style={styles.title}>{props.task.task}</Text>
                        </View>

                        {/* {Line} */}
                        <View style={styles.line}></View>

                        {/* {Quest Reward} */}
                        <View style={styles.reward_wrapper}>
                            <View style={[styles.quest_flexdir, {justifyContent: 'space-between'}]}>
                                <Text>
                                    <Text style={styles.point_text}>{props.task.points}</Text>
                                    <Text style={styles.point_symbol}> PPt</Text>
                                </Text>
                                
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
                                ]}>{isCompleted ? 'Completed' : (props.task.progress.current.toString() + '/' + props.task.progress.max.toString())}</Text>
                            </View>
                        </View>

                        {/* {Due Date} */}
                        {
                            props.task.date.due_date != null &&
                            <Text>
                                {
                                    true && <Text style={{color:"white"}}>Due: </Text>
                                }
                                <Text style={{color: dateColor}}>{new Date(props.task.date.due_date).getDate().toString()}/{(new Date(props.task.date.due_date).getMonth() + 1).toString()}
                                
                                {
                                    new Date(props.task.date.due_date).getFullYear() != new Date().getFullYear() ?
                                    "/" + new Date(props.task.date.due_date).getFullYear().toString()
                                    :
                                    ""
                                }
                            
                                </Text>
                                
                                {
                                    !props.task.date.full_day && <Text style={{color: dateColor}}>{"  "}
                                        {
                                            new Date(props.task.date.due_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: isHour12 })
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