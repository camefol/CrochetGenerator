import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BetterText } from "@/components/topology/BetterText";
import { AuthenticationContext } from "@/components/authentication/context";
import { Card, Button } from "react-native-paper";
import { DiagramContext } from "@/components/custom/CrochetDiagramsContext";
import { DiagramInfoCard } from "@/components/diagramForm/CrochetDiagramTemplate";
import { dimensionStyles } from "@/components/custom/dimensionsView";
import { FIREBASE_AUTH } from "@/firebase.config";

export default function () {
    const { diagrams, handleTest, addDiagram  } = useContext(DiagramContext)
    const { getStripeRole } = useContext(AuthenticationContext)

  
      const tutorialTextBasic = (
        <Text>
          Hello unsubscribed user!
        </Text>
      )

      
    return (
        <View style={dimensionStyles.mainContainer}>
            <View style={styles.containerIntro}>
                <BetterText type="defaultSemiBold" style={styles.introductionText}>Create your own Crochet Patterns from scratch.</BetterText>
                <BetterText type="defaultSemiBold" style={{textAlign:'center', marginTop:15}}>You can just use our generator.</BetterText>
            </View>
            <View style={styles.containerDiagrams}>
            <Text style={{textAlign:'center'}}>
              Tutorial
            </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        margin: 10,
        alignItems:'center'
    },
    containerIntro:{
        flex:1,
    },
    containerDiagrams:{
        flex:1,
        justifyContent:'center',
        marginBottom:10,
    },
    introductionText : {
      fontSize: 18,
      textAlign:'center'
    }
})