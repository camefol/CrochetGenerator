import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Text>Hello</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})