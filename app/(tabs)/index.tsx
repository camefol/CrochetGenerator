import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BetterText } from "@/components/topology/BetterText";
import { Card, Button } from "react-native-paper";
import { DiagramContext } from "@/components/custom/CrochetDiagramsContext";
import { DiagramInfoCard } from "@/components/diagramForm/CrochetDiagramTemplate";


export default function () {
    const { diagrams, handleTest, addDiagram } = useContext(DiagramContext)
    return (
        <View style={styles.container}>
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
            <Button mode="outlined" onPress={addDiagram}> Test </Button>
            </View>
        </View>
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