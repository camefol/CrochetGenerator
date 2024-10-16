import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthenticationContext } from "@/components/authentication/context";
import { Button } from "react-native-paper";
export default function TabSettings () {
    const { logout } = useContext(AuthenticationContext)
    const  handleLogout = async () => {
        await logout()
    }
    return (
        <SafeAreaView>
        <View>
            <Text>Tab 2</Text>
            <Button onPress={handleLogout}>Logout</Button>
        </View>
        </SafeAreaView>
    )
}