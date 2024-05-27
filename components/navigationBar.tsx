import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const NavigationBar = () => {
    const tabs = [
        { key: 1, name: "Home", source: FontAwesome, icon: "home", path: "/home" },
        { key: 2, name: "Map", source: FontAwesome, icon: "map-marker", path: "/map" },
        { key: 3, name: "Messages", source: Ionicons, icon: "chatbubble-ellipses", path: "/messages" },
        { key: 4, name: "Profile", source: Ionicons, icon: "person-circle-sharp", path: "/profile" },
    ];

    return (
        <View className="flex flex-row w-full justify-evenly py-4 bg-white border-t border-black">
            {tabs.map((tab) => {
                const IconComponent = tab.source;
                return (
                  <View className="flex w-1/6 items-center">
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