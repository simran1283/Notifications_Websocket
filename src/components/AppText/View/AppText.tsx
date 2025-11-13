import { StyleSheet, Text } from "react-native"
import { vs } from "react-native-size-matters"
import { AppTextProps } from "../Model/AppTextProps"


const AppText : React.FC<AppTextProps> = ({title, style}) => {
    return(
        <Text style={[styles.title, style]}>{title}</Text>
    )
}

export default AppText

const styles = StyleSheet.create({
    title : {
        fontSize : vs(14),
        fontWeight : "bold",
    }
})