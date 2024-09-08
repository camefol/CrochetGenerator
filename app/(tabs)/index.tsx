import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BetterText } from "@/components/topology/BetterText";
import { Card, Button } from "react-native-paper";

export default function () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerIntro}>
                <BetterText type="defaultSemiBold">Create your own Crochet Patterns from scratch.</BetterText>
                <BetterText type="defaultSemiBold" style={{textAlign:'center'}}>You can just use our generator.</BetterText>
            </View>
            <View>
                <Text></Text>
            </View>
            <View style={styles.containerDiagrams}>
            <Text>
                Hi
            </Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 10,
        alignItems:'center'
    },
    containerIntro:{
        flex:0.5,
    },
    containerDiagrams:{
        flex:1,
    }
})