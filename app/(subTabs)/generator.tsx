import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { BetterText } from "@/components/topology/BetterText";
import { AuthenticationContext } from "@/components/authentication/context";
import { useContext, useState, useEffect } from "react";
import { dimensionStyles } from "@/components/custom/dimensionsView";

export default function TabGenerator () {
    const { user } = useContext(AuthenticationContext)
    const [diagram, setDiagram] = useState({})

    const createPrototypeDiagram = () => {
        setDiagram(() => {
            const newDiagram = {
                name:'Hi'
            }
            return newDiagram;
        })
        console.log(diagram)
    }

    const GetDiagram = async () => {
        try{
          return createPrototypeDiagram()
        } catch (e){
            console.log(e)
        }
    }


    return (
        <View style={dimensionStyles.mainContainer}>
            <Button
            mode="elevated"
            style={styles.button}
            onPress={GetDiagram}
            >
            
               <BetterText type="title">Generate</BetterText>
            </Button>
        </View>
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