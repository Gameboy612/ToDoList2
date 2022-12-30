import { View, Text, StyleSheet } from "react-native"
import myJson from './example.json' assert {type: 'json'};


export default function TimelineDate(props) {
    const translate_TODAY = "Today"
    const translate_TOMORROW = "Tomorrow"
    const translate_YESTERDAY = "Yesterday"
    
    
    function sameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
    }

    function getRelativeDay(days = 1, date = new Date()) {
        const relative = new Date(date.getTime());
        relative.setDate(date.getDate() + days);
      
        return relative;
    }

    const DATE = new Date(props.date)

    return (
        <>
        <Text>{
            sameDay(new Date(), DATE)
            ?
            translate_TODAY
            :
            (
                sameDay(getRelativeDay(1), DATE)
                ?
                translate_TOMORROW
                :
                (
                    sameDay(getRelativeDay(-1), DATE)
                    ?
                    translate_YESTERDAY
                    :
                    new Date(props.date).getDate() + "/" + (new Date(props.date).getMonth() + 1).toString()
                )
            )
        }</Text>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: "#fff",

    }
})