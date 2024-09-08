import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { BetterText } from "@/components/topology/BetterText";
import CrochetDiagram, {Diagram} from "@/components/custom/Crochet-diagram";

export default function TabGenerator () {

    const GetDiagram = () => {
        console.log(CrochetDiagram)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerDescription}>
                <View style={{flex:0.8}}>
                <TextInput 
                mode="outlined"
                maxLength={100}
                style={{
                    flex:1,
                    margin: 10,
                }}
                >
                    Hello</TextInput>
                <TextInput 
                style={{
                    flex:1
                }}
                >
                    Hi</TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                <TextInput style={{flex:1}}></TextInput>
                </View>
            </View>
            <Button
            mode="elevated"
            style={styles.button}
            onPress={GetDiagram}
            >
            
               <BetterText type="title">Generate</BetterText>
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDescription:{
        flex:1,
        alignItems:'center',
    },
    button:{
        marginLeft:20,
        marginRight:20,
    }

})