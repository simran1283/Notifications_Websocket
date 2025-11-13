import { StyleProp, ViewStyle } from "react-native"

export type ReadStatusCardProps = {
    style?: StyleProp<ViewStyle>
    total : number
    readCount : number
    unreadCount : number
}