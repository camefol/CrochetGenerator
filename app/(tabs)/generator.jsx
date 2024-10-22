import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { BetterText } from "@/components/topology/BetterText";
import { AuthenticationContext } from "@/components/authentication/context";
import { useContext, useState, useEffect } from "react";
import { dimensionStyles } from "@/components/custom/dimensionsView";
import { DiagramContext } from "@/components/custom/CrochetDiagramsContext";
import DismissingKeyboardWrapper from "@/components/custom/DismissingKeyboardWrapper";
import { Picker } from "@react-native-picker/picker";

export default function TabGenerator () {
    const { user } = useContext(AuthenticationContext)
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [hookSize, setHookSize] = useState("");
    const [stitch, setStitch] = useState("");
    const stitchChoices = ['', ...'SC']
    const [diagram, setDiagram] = useState({})
    const { addDiagram } = useContext(DiagramContext)
    const clothTypes = [
        'blanket'
    ]

    const handleAddDiagram = async () => {
        try {
            const newDiagram = {
                Name: name.trim(),
                Height: height.trim(),
                Width: width.trim(),
                HookSize: hookSize,
                Stitch: stitch,
                Type: "Prototype", // Example field you might want to include
                Columns: "0", // Example default values
                Rows: "0",
                Description: "Generated from TabGenerator"
            };
            if (newDiagram.Name)
            await addDiagram(newDiagram); // Pass the new diagram to addDiagram function
            console.log("Diagram added successfully:", newDiagram);
        } catch (error) {
            console.error("Error adding diagram:", error);
        }
    };


    return (
        <DismissingKeyboardWrapper>
        <View style={dimensionStyles.mainContainer}>
        <View style={styles.containerDiagrams}>
            <Text>Hello</Text>
        </View>
        <View style={styles.containerGenerator}>
        <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            
            mode="outlined"
        />
        <TextInput
            label="Height"
            value={height}
            keyboardType="numeric"
            onChangeText={setHeight}
            mode="outlined"
        />
        <TextInput
            label="Width"
            value={width}
            keyboardType="numeric"
            onChangeText={setWidth}
            mode="outlined"
        />
        <TextInput
            label="Hook Size"
            value={hookSize}
            onChangeText={setHookSize}
            mode="outlined"
        />
        <TextInput
            label="Stitch"
            value={stitch}
            onChangeText={setStitch}
            mode="outlined"
        />

        </View>

        <Button
            mode="elevated"
            style={styles.button}
            onPress={handleAddDiagram}
        >
            <BetterText type="title">Generate</BetterText>
        </Button>
    </View>
    </DismissingKeyboardWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDiagrams:{
        flex:1,
        alignItems:'flex-start',
    },
    button:{
        margin:20
    },
    containerGenerator: {
        flex: 3,
        justifyContent:'flex-start'
    }

})