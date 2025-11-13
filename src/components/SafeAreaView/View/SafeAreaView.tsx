import { StyleSheet, View } from "react-native"
import { vs } from "react-native-size-matters"
import { SafeAreaViewProps } from "../Model/SafeAreaView"

const SafeAreaView : React.FC<SafeAreaViewProps>= ({children}) => {
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default SafeAreaView

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#ffffff",
        padding : vs(15),
        marginTop : vs(22)
    }
})