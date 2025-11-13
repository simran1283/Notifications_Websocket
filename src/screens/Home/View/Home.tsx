import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { data } from "../../../data/data"
import Card from "../../../components/Cards/View/Card"
import AppText from "../../../components/AppText/View/AppText"
import ReadStatusCard from "../../../components/ReadStatusCard/View/ReadStatusCard"
import useHome from "../ViewModel/Home"
import { useEffect, useState } from "react"
import { vs } from "react-native-size-matters"
import NotificationCard from "../../../components/NotificationCard/View/NotificationCard"
import { Notification } from "../Model/HomeProps"



const Home = () => {

    const { connected, setConnected, notification, setNotification,
        connectWebSocket, disConnectWebSocket, connectionStatus,
        wsRef, counts, total, readCount, unreadCount, handleDismiss, handleMarkAsRead } = useHome()

    const [current, setCurrent] = useState<Notification | null>(null);

    useEffect(() => {
        if (connected === true) {
            connectWebSocket()
        }

        if (connected === false) {
            disConnectWebSocket()
        }
        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close(1000, 'Component unmounting');
            }
        };

    }, [connected])

    useEffect(() => {
        if (!current && notification.length > 0) {
            setCurrent(notification[0]); // take first
            setNotification(prev => prev.slice(1)); // remove from queue
        }
    }, [notification, current])

    useEffect(() => {
        if (!current) return;

        const timer = setTimeout(() => {
            setCurrent(null);
        }, 3000); //notification stays for 3 seconds

        return () => clearTimeout(timer);
    }, [current]);


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <AppText title={connectionStatus} style={{ fontSize: vs(11) }} />
                <TouchableOpacity onPress={() => setConnected((prev) => !prev)} style={styles.bttn}>
                    <AppText title={connected ? "Disconnect" : "Connect"} style={{ fontSize: vs(11) }} />
                </TouchableOpacity>
            </View>
            <AppText title="Notification Count" />
            <FlatList
                data={data}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => <Card item={item} count={counts[item.type]} />}
                numColumns={2} />
            <View style={styles.readStatusContainer}>
                <AppText title="Read Status" />
                <ReadStatusCard total={total} readCount={readCount} unreadCount={unreadCount} />
            </View>
            {current && (
                <View style={styles.notificationContainer}>
                    <NotificationCard
                        type={current.type}
                        title={current.title}
                        message={current.message}
                        timestamp={current.timestamp.substring(12, 16)}
                        badge={current.priority || current.error_code || current.completion_time}
                        markAsRead = {handleMarkAsRead}
                        dismiss = {handleDismiss}
                    />
                </View>
            )}

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1
    },
    bttn: {
        backgroundColor: "#74e1d1ff",
        borderRadius: vs(10),
        width: "30%",
        height: "auto",
        alignSelf: "flex-end",
        padding: vs(5),
        alignItems: "center",
        justifyContent: "center"
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    readStatusContainer: {
        marginBottom: vs(300)
    },
    notificationContainer: {
        position: "absolute",
        bottom: vs(40),
        width: "100%",
        paddingHorizontal: vs(10)
    }
})