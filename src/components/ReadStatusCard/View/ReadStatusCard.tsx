import { StyleSheet, View } from "react-native"
import AppText from "../../AppText/View/AppText"
import { vs } from "react-native-size-matters"
import { ReadStatusCardProps } from "../Model/ReadStatusCardProps"


const ReadStatusCard: React.FC<ReadStatusCardProps> = ({ style, total, readCount, unreadCount }) => {

    return (
        <View style={[styles.container, style]}>
            <View style={styles.innerContainer}>
                <AppText title="Unread" style={styles.title} />
                <AppText title={String(unreadCount)} />
            </View>
            <View style={styles.verticalRule}></View>
            <View style={styles.innerContainer}>
                <AppText title="Read" style={styles.title} />
                <AppText title={String(readCount)} />
            </View>
            <View style={styles.verticalRule}></View>
            <View style={styles.innerContainer}>
                <AppText title="Total" style={styles.title} />
                <AppText title={String(total)} />
            </View>
        </View>
    )
}

export default ReadStatusCard

const styles = StyleSheet.create({
    container: {
        width: "96%",
        height: vs(70),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: vs(8),
        margin: vs(8),
        backgroundColor: "#efeeeeff",
    },
    innerContainer: {
        alignItems: "center"
    },
    title: {
        marginBottom: vs(8),
        fontSize: vs(12),
        fontWeight: "normal"
    },
    verticalRule: {
        backgroundColor: "#9c9c9cff",
        height: "60%",
        width: vs(1)
    }
})