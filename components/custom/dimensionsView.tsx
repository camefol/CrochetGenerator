import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get('window');  // Get screen width and height

export const dimensionStyles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent: 'center',
        marginLeft:width * 0.10,
        marginRight:width * 0.10,
    }
})