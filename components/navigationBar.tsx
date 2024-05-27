import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const NavigationBar = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:'blue',
    }}>
      <Tabs.Screen name = "home"
        options = {{headerShown: false,
                    tabBarLabel: "Home",
                    tabBarIcon:({color, size}) => <FontAwesome name="home" size={24} color="black" />}}/>
      <Tabs.Screen name = "map"
        options = {{headerShown: false,
                    tabBarLabel: "Map",
                    tabBarIcon:({color, size}) => <FontAwesome name="map-marker" size={24} color="black" />}}/>
      <Tabs.Screen name = "messages"
        options = {{headerShown: false,
                    tabBarLabel: "Messages",
                    tabBarIcon:({color, size}) => <Ionicons name="chatbubble-ellipses" size={24} color="black" />}}/>
      <Tabs.Screen name = "profile"
        options = {{headerShown: false,
                    tabBarLabel: "Profile",
                    tabBarIcon:({color, size}) => <Ionicons name="person-circle-sharp" size={24} color="black" />}}/>
    </Tabs>
  );
};

export default NavigationBar;