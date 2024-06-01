import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import DateSlider from './components/dateSlider';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';

const ItineraryPage = () => {
  return (
    <View className="flex flex-col justify-between h-full bg-white">
      <TripHeader/>
      <DateSlider/>
      <View className="flex flex-row w-full px-8 justify-between">
        <Button text="Generate New Itinerary" type="plain" textType="bold" size="lg" corners="rounded"/>
        <Button text="+" type="black" textType="bold" size="circle" corners="rounded"/>
      </View>
      <NavigationBar/>
    </View>
  );
};

export default ItineraryPage;