import React from 'react';
import { View, Image, Text } from 'react-native';
import Header from '@/components/header';
import SearchButton from './searchButton';
import { format } from 'date-fns';

const icon = require('@/assets/images/budget-page/accommodation.png');

type AccommodationDisplayProps = {
  booking: any;
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccommodationDisplay = ({booking, isPopupVisible, setPopupVisible}: AccommodationDisplayProps) => {
  return (
    <View className="flex h-2/5 w-full pt-4 pb-8 px-8">
      <View className="flex flex-row justify-between items-center w-full border">
        <Image source={icon} className="w-10 h-10 mx-2"/>
        <Header text="Accommodation" size="md" padding="none"/>
        <SearchButton onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      {!booking &&
        <View className="flex h-3/4 items-center justify-center border-x border-b">
          <Text className="text-center text-gray-500">No accommodation booked</Text>
          <Text className="text-center text-gray-500">Click the search button to find accommodation!</Text>
        </View>
      } 
      {booking &&
        <View className="flex flex-row h-3/4 items-center justify-start border-x border-b">
          <Image source={{uri: booking[0].logo}} className="h-24 w-24 m-4"/>
          <View className="flex flex-col w-3/5 items-start justify-center">
            <Text className="font-bold">{booking[0].hotelName}</Text>
            <Text className="text-xs">{booking[0].hotelAddress}</Text>
            <Text className="text-xs">{format(new Date(booking[0].fromDate), 'd MMM yy')} - {format(new Date(booking[0].endDate), 'd MMM yy')}</Text>
          </View>
        </View>
      }
    </View>
  );
};

export default AccommodationDisplay;