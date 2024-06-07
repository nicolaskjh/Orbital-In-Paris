import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import DateSlider from './components/dateSlider';
import Activities from './components/activities';
import NewActivity from './components/newActivity';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';

const ItineraryPage = () => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);

  const handleNewActivityPress = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <View className="flex flex-col justify-between h-full bg-white">
      <TripHeader/>
      <DateSlider/>
      <Activities/>
      <NewActivity isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <View className="flex flex-row w-full px-8 py-2 justify-between">
        <Button text="Generate New Itinerary" type="plain" textType="bold" size="lg" corners="rounded"/>
        <Button text="+" type="black" textType="bold" size="circle" corners="rounded" onPress={handleNewActivityPress}/>
      </View>
      <NavigationBar/>
    </View>
  );
};

export default ItineraryPage;