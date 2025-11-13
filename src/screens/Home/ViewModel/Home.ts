import { useRef, useState } from "react";
import { Alert } from "react-native";
import { Notification } from "../Model/HomeProps";


const useHome = () => {

    const [connected, setConnected] = useState(false); // manually connect/disconnect to Websocket
    const [notification, setNotification] = useState<Notification[]>([]); // notification Data
    const [connectionStatus, setConnectionStatus] = useState("Disconnected") //connection status
    const wsRef = useRef<WebSocket | null>(null) // websocket connection reference
    const actionTriggered = useRef(false) // mark as read / dismiss buttons ref
    const [counts, setCounts] = useState({
        "info": 0,
        "warning": 0,
        "error": 0,
        "success": 0
    })
    const [total, setTotal] = useState(0)
    const [readCount, setReadCount] = useState(0)
    const [unreadCount, setUnreadCount] = useState(0)


    const incrementCounts = (type: string) => {
        setCounts((prev) => ({
            ...prev,
            [type]: prev[type] + 1
        }))
    }

    const incrementTotal = () => {
        setTotal((prev) => prev + 1)
    }
    
    const incrementRead = () => {
        setReadCount((prev) => prev + 1)
    }

    const incrementUnread = () => {
        setUnreadCount((prev) => prev + 1)
    }

    const decrementUnread = () => {
        setUnreadCount((prev) => prev - 1)
    }


    const connectWebSocket = () => {

        try {
            const clientId = `cli-client${Date.now()}` // unique client id
            const ws = new WebSocket(`wss://mockly.me/ws/notify/${clientId}`) // new instance for websocket
            wsRef.current = ws


            //Handling connection open
            ws.onopen = () => {
                setConnected(true)
                setConnectionStatus("Connected")
                const config = {
                    frequency: 4
                }
                ws.send(JSON.stringify(config))
            }




            //handling notifiications
            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    setNotification(prev => [...prev, message])
                    switch (message.type) {
                        case "info":
                            incrementCounts("info")
                            incrementTotal()
                            incrementUnread()
                            break;

                        case "warning":
                            incrementCounts("warning")
                            incrementTotal()
                            incrementUnread()
                            break;

                        case "error":
                            incrementCounts("error")
                            incrementTotal()
                            incrementUnread()
                            break;

                        case "success":
                            incrementCounts("success")
                            incrementTotal()
                            incrementUnread()
                            break;

                        default:
                            console.log("Default Case")
                    }
                }
                catch (err) {
                    console.log("Error in incoming Notifications")
                    Alert.alert("Error in Incoming Notifications")
                }

            }




            //closing connection with websocket
            ws.onclose = (event) => {
                console.log('🔌 WebSocket disconnected:', event.code, event.reason);
                setConnected(false)
                setConnectionStatus("Disconnected")
                // Attempt to reconnect after 5 seconds
                if (event.code !== 1000) {
                    setTimeout(() => {
                        console.log('Attempting to reconnect...');
                        connectWebSocket();
                    }, 5000);
                }
            };



            //handling error in websocket
            ws.onerror = (error) => {
                console.log("Error connecting to Websocket", error)
            }


        } catch (error) {
            console.log("Error connecting to Websocket")
            Alert.alert("Error connecting to WebSocket")
        }

    }



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

    //handling manual disconnection from websocket
    const disConnectWebSocket = () => {
        const ws = wsRef.current
        if (!ws) return;
        ws?.close()
    }

    return {
        wsRef,
        connected,
        setConnected,
        notification,
        setNotification,
        connectionStatus,
        setConnectionStatus,
        counts,
        total,
        incrementRead,
        decrementUnread,
        incrementUnread,
        readCount,
        unreadCount,
        connectWebSocket,
        disConnectWebSocket,
        handleDismiss,
        handleMarkAsRead
    };
}

export default useHome;