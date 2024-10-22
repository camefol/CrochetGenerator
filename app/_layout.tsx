import { Stack, useRouter } from "expo-router";
import { AuthenticationProvider, AuthenticationContext } from "@/components/authentication/context";
import { useContext, useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Background } from "@/components/custom/background";
import { DiagramProvider } from "@/components/custom/CrochetDiagramsContext";
import { DiagramInfoContextProvider } from "@/components/custom/CrochetDiagramInfoContext";


 function RootLayoutContent() {
    const { user, isAuthenticated, getStripeRole, isLoading } = useContext(AuthenticationContext)
    const [authenticated, setAuthenticated] = useState(false)
    const [stripeRoleStatus, setStripeRoleStatus] = useState('basic');
    const router = useRouter();

    useEffect(() => {
      const fetchStripeRole = async () => {
        try {
          const role = await getStripeRole();
          setStripeRoleStatus(role);
          if (!role) {
            console.log('Not authenticated yet')
          } else {
            console.log("Stripe Role fetched: ", role);
          }
          
        } catch (error) {
          console.log("Error fetching stripe role: ", error);
        }
      };
  
      fetchStripeRole();
    }, [user]);

    useEffect(() => {
      if (isAuthenticated) {
        if (stripeRoleStatus==='basic') {
        router.replace('/(tabs)');
      } else if(stripeRoleStatus==='premium') {
        router.replace('/(subTabs)');
      }
      } else {
        router.replace('/(authentication)/login');
      }
    }, [isAuthenticated, stripeRoleStatus]);
    
  return (
    
    <Stack screenOptions={{headerTransparent:true, headerTitle:' ', headerBackTitleVisible:false, animation:'slide_from_bottom'}}>
      <Stack.Screen 
      name="(tabs)" 
      options={{headerTransparent:false, headerTitle:'Home', headerShown:false, gestureDirection:'horizontal', gestureEnabled:true}}
      />
      <Stack.Screen name="+not-found"  />
      <Stack.Screen name="(authentication)/login" options={{headerTitle:'Crochet Diagrams', headerShown:false}} />
      <Stack.Screen name="(authentication)/register" />
      <Stack.Screen name="diagrams" options={{ presentation: 'modal', headerTitle: 'Diagrams' }} />
      <Stack.Screen 
      name="(subTabs)" 
      options={{headerTransparent:false, headerTitle:'Home', headerShown:false, gestureDirection:'horizontal', gestureEnabled:true}}
      />
    </Stack>

  );
}

export default function RootLayout() {
  return (

    <AuthenticationProvider>

      <DiagramInfoContextProvider>

        <DiagramProvider>

          <RootLayoutContent />

        </DiagramProvider>

      </DiagramInfoContextProvider>
      
    </AuthenticationProvider>


  );
}


