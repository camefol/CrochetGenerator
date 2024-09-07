import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BetterText } from "@/components/topology/BetterText";
export default function TabLayout (){
    
    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor:"white",
            tabBarInactiveTintColor:"gray",
            tabBarHideOnKeyboard:true,
            headerTransparent:false,
            headerStyle:{
                backgroundColor: "rgba(0, 0, 0, 0.3)"
            },
            tabBarStyle:{
                backgroundColor:"darkblue",
            }
            }}>
            <Tabs.Screen
            name="index"
            options={{
                title:"Home",
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                  ),
            }}
            />
            <Tabs.Screen
            name="generator"
            options={{
                title:'Generator',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'bulb' : 'bulb-outline'} color={color} />
                  ),
            }}
            />
            <Tabs.Screen
            name="settings"
            options={{
                title:'Settings',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
                  ),
            }}
            />
        </Tabs>
    );
}