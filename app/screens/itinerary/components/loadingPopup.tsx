import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

type LoadingPopupProps = {
  isLoading: boolean;
}; 

const LoadingPopup = ({isLoading}: LoadingPopupProps) => {
  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isLoading}>
        <View className="flex justify-center items-center h-full">
          <View className="flex flex-col justify-center items-center h-1/6 w-4/5 p-2 pb-2 bg-white rounded-xl">
            <Text className="text-xl font-bold m-2">Generating itinerary...</Text>
            <ActivityIndicator size="large" color="#999999"/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadingPopup;