import { StyleSheet, View } from "react-native"
import AppText from "../../AppText/View/AppText"
import { vs } from "react-native-size-matters"
import { CardProps } from "../Model/CardProps"


const Card : React.FC<CardProps> = ({item, style, count}) => {
    return(
        <View style={[styles.container, {backgroundColor : item.backgroundColor}, style]}>
            <AppText title={item.title} style={[styles.title , {color : item.titleColor}]}/>
            <AppText title={String(count)} style={{color : item.countColor}}/>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container : {
        width : "45%",
        height : vs(70),
        alignItems : "center",
        justifyContent : "center",
        borderRadius : vs(8),
        margin : vs(8)
    },
    title : {
        marginBottom : vs(8), 
        fontSize : vs(12)
    }
})