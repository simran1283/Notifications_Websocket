import { StyleSheet, TouchableOpacity, View } from "react-native"
import AppText from "../../AppText/View/AppText"
import { vs } from "react-native-size-matters"
import Animated, { LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated"
import { NotificationCardProps, typeStyles } from "../Model/NotificationCardProps"
import { useRef } from "react"



const NotificationCard: React.FC<NotificationCardProps> = ({ type, title, message, timestamp, badge, incrementRead, decrementUnread }) => {

    const styleByType = typeStyles[type] ?? typeStyles["info"]

    const actionTriggered = useRef(false) // mark as read / dismiss buttons ref
    const handleMarkAsRead = () => {
        if (actionTriggered.current) return
        actionTriggered.current = true

        incrementRead()
        decrementUnread()
    }

    const handleDismiss = () => {
        if (actionTriggered.current) return
        actionTriggered.current = true

        decrementUnread()
    }

    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} style={[styles.container, { backgroundColor: styleByType.bg, borderLeftColor: styleByType.border }]}>
            <View style={styles.topContainer}>
                <View style={styles.titleContainer}>
                    <AppText title={title} />
                    {badge && <AppText title={badge.toString().toUpperCase()} style={[styles.badge, { backgroundColor: styleByType.border }]} />}
                </View>
                <AppText title={timestamp} style={styles.timestamp} />
            </View>
            <AppText title={message} style={styles.title} />
            <View style={styles.bttnContainer}>
                <TouchableOpacity onPress={() => {
                   handleMarkAsRead()
                }}>
                    <AppText title="Mark as Read" style={styles.markReadBttn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleDismiss()
                }}>
                    <AppText title="Dismiss" style={styles.dismissBttn} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        padding: vs(10),
        borderRadius: vs(10),
        borderLeftWidth: vs(4)
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: vs(2)
    },
    badge: {
        fontWeight: "400",
        fontSize: vs(10),
        color: "white",
        borderRadius: vs(10),
        padding: vs(3),
        paddingHorizontal: vs(6)
    },
    timestamp: {
        fontSize: vs(11),
        fontWeight: "normal",
        color: "grey"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: vs(8)
    },
    title: {
        fontWeight: "500",
        color: "grey",
        fontSize: vs(12)
    },
    bttnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: vs(10),
        marginTop: vs(10)
    },
    dismissBttn: {
        fontSize: vs(11),
        color: "#000000",
        fontWeight: "normal"
    },
    markReadBttn: {
        fontSize: vs(11),
        color: "#f85e5eff",
        fontWeight: "normal"
    }
})