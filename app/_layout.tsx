import { Stack, useRouter } from "expo-router";
import { AuthenticationProvider, AuthenticationContext } from "@/components/authentication/context";
import { useContext, useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Background } from "@/components/custom/background";
import { DiagramProvider } from "@/components/custom/CrochetDiagramsContext";



 function RootLayoutContent() {
    const { user, isAuthenticated } = useContext(AuthenticationContext)
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(authentication)/login');
      }
    }, [isAuthenticated]);
    
  return (
    
    <Stack screenOptions={{headerTransparent:true, headerTitle:' ', headerBackTitleVisible:false, animation:'simple_push'}}>
      <Stack.Screen 
      name="(tabs)" 
      options={{headerTransparent:false, headerTitle:'Home', headerShown:false, gestureDirection:'horizontal', gestureEnabled:true}}
      />
      <Stack.Screen name="+not-found"  />
      <Stack.Screen name="(authentication)/login" options={{headerTitle:'Crochet Diagrams', headerShown:false}} />
      <Stack.Screen name="(authentication)/register" />
      <Stack.Screen name="diagrams" options={{ presentation: 'modal', headerTitle: 'Diagrams' }} />
    </Stack>

  );
}

export default function RootLayout() {
  return (

    <AuthenticationProvider>
      <DiagramProvider>
      <RootLayoutContent />
      </DiagramProvider>
    </AuthenticationProvider>


  );
}


