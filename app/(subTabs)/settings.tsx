import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthenticationContext } from "@/components/authentication/context";
import { Button } from "react-native-paper";
import { dimensionStyles } from "@/components/custom/dimensionsView";
export default function TabSettings () {
    const { logout, user } = useContext(AuthenticationContext)
    const  handleLogout = async () => {
        await logout()
    }
    return (
        <View style={dimensionStyles.mainContainer}>
            <View style={styles.userContainer}>
                {user ? (
                    <Text>Subscribed User: {user.email}</Text>
                ) : (
                    <Text>No user logged in</Text>
                )}
                <Button onPress={handleLogout}>Logout</Button>
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    userContainer : {
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});