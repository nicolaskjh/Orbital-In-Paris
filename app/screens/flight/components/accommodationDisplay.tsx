import React from 'react';
import { View, Image, Text } from 'react-native';
import Header from '@/components/header';
import SearchButton from './searchButton';

const icon = require('@/assets/images/budget-page/accommodation.png');

type AccommodationDisplayProps = {
  booking: any;
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccommodationDisplay = ({booking, isPopupVisible, setPopupVisible}: AccommodationDisplayProps) => {
  return (
    <View className="flex h-1/3 w-full pt-4 pb-8 px-8">
      <View className="flex flex-row justify-between items-center w-full border">
        <Image source={icon} className="w-10 h-10 mx-2"/>
        <Header text="Accommodation" size="md" padding="none"/>
        <SearchButton onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      {!booking &&
        <View className="flex h-2/3 items-center justify-center border-x border-b">
          <Text className="text-center text-gray-500">No accommodation booked</Text>
          <Text className="text-center text-gray-500">Click the search button to find accommodation!</Text>
        </View>
      } 
    </View>
  );
};

export default AccommodationDisplay;