import { View, Text, StyleSheet } from "react-native";

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

    const styles = StyleSheet.create({
        padding: {
            marginTop: props.index == 0 ? 0 : 40,
            paddingHorizontal: 20
        },
        date_text: {
            color: "#777",
            fontSize: 18,
            fontWeight: "bold"
        },
        remaining_days_text: {
            color: "#999",
            fontSize: 14,
            fontWeight: "bold",
            alignSelf: "flex-end"
        },
        text_space: {
            width: '100%'  
        },
        line: {
            backgroundColor: "#777",
            width: "100%",
            height: 5
        }
    })
    
    return (
        <View style={styles.padding}>
            <View>
                <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
                    <Text style={styles.date_text}>{
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
                    <Text style={styles.remaining_days_text}> {
                        Math.abs(Math.floor((new Date().getTime() - new Date(props.date).getTime()) / 86400000))

                    } Days {
                        Math.floor(new Date().getTime() / 86400000) > Math.floor(new Date(props.date).getTime() / 86400000) ?
                        "Ago"
                        :
                        "Later"
                    }</Text>

                </View>
                
            </View>
            <View style={styles.line}></View>

        </View>
    )

    
}

