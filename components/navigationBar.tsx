import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const NavigationBar = () => {
    const tabs = [
        { id: 0, name: "Home", source: FontAwesome, icon: "home", path: "/home" },
        { id: 1, name: "Map", source: FontAwesome, icon: "map-marker", path: "/map" },
        { id: 2, name: "Invites", source: Ionicons, icon: "mail", path: "/messages" },
        { id: 3, name: "Profile", source: Ionicons, icon: "person-circle-sharp", path: "/profile" },
    ];

    return (
        <View className="flex flex-row w-full justify-evenly py-4 bg-white border-t border-black">
            {tabs.map((tab) => {
                const IconComponent = tab.source;
                return (
                  <View key={tab.id} className="flex w-1/6 items-center">
                    <Link href={tab.path} className="flex flex-col">
                        <View className="items-center">
                            <IconComponent name={tab.icon} size={25} color="black"/>
                            <Text className="text-xs font-medium pb-1">{tab.name}</Text>
                        </View>
                    </Link>
                  </View>
            )})}
        </View>
    );
};

export default NavigationBar;