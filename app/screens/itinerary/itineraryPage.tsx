import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import WeekCalendar from './components/weekCalendar';
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
  const [date, setDate] = React.useState(parseISO(trip.start_date));

  const newActivityPress = () => {
    setPopupVisible(!isPopupVisible);
  };

  const newActivitySubmit = (activityDate: Date) => {
    setDate(activityDate);
    setRefreshKey(oldKey => oldKey + 1);
  }

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM');
  };

  return (
    <View className="flex flex-col justify-between h-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <WeekCalendar date={date} tripStart={parseISO(trip.start_date)} tripEnd={parseISO(trip.end_date)} onSelectDate={(newDate) => setDate(newDate)}/>
      <Activities trips={trip} selectedDay={date} tripStart={parseISO(trip.start_date)} refreshToken={refreshKey}/>
      <NewActivity isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} trip={trip} onActivitySubmit={newActivitySubmit}/>
      <View className="flex flex-row w-full px-8 py-2 justify-between">
        <Button text="Generate New Itinerary" type="plain" textType="bold" size="lg" corners="rounded"/>
        <Button text="+" type="black" textType="bold" size="circle" corners="rounded" onPress={newActivityPress}/>
      </View>
      <NavigationBar/>
    </View>
  );
};

export default ItineraryPage;