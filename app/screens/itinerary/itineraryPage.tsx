import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import DateSlider from './components/dateSlider';
import Activities from './components/activities';
import NewActivity from './components/newActivity';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { parseISO, format } from "date-fns";

const ItineraryPage = () => {
  const router = useRouter();
  const trip = useLocalSearchParams();
  const [isPopupVisible, setPopupVisible] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleNewActivityPress = () => {
    setPopupVisible(!isPopupVisible);
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM');
  };

  return (
    <View className="flex flex-col justify-between h-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <DateSlider/>
      <Activities trips = {trip} refreshToken= {refreshKey}/>
      <NewActivity isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} trip={trip} onActivitySubmit={() => setRefreshKey(oldKey => oldKey + 1)}/>
      <View className="flex flex-row w-full px-8 py-2 justify-between">
        <Button text="Generate New Itinerary" type="plain" textType="bold" size="lg" corners="rounded"/>
        <Button text="+" type="black" textType="bold" size="circle" corners="rounded" onPress={handleNewActivityPress}/>
      </View>
      <NavigationBar/>
    </View>
  );
};

export default ItineraryPage;