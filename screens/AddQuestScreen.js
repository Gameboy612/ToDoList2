import { useState } from 'react';
import InputCard from './AddQuestScreen/components/quest/InputCard';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function AddQuestScreen({ navigation, route }) {

    let card = route.params.card
    let index = route.params.index

    if(!card) card = false
    if(index == undefined) index = -1
    console.log(card)
    return (
        <View>
            <ScrollView
                decelerationRate={0.85}
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false} 
                overScrollMode='never'
                style={styles.screen_wrapper}
            >
                <View style={styles.input_card}>
                    <InputCard task={{tag: ["Daily"], task: "Clean House", progress: {current: 0, max:1}, points: 25, date:{due_date:2672048923895 , full_day: false}}} navigation={navigation} card={card} index={index}/>
                </View>

            </ScrollView>
            
        </View>
            
    )
}

const styles = StyleSheet.create(
    {
        input_card: {
            marginTop: 5
        },
        screen_wrapper: {
            width: width,
            height: height
        },
        inner_padding: {
            paddingVertical: 20
        },
    }
)