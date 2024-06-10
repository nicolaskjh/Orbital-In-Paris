import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import Header from '@/components/header';
import GroupMembers from './components/groupMembers';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { parseISO, format } from "date-fns";

const GroupPage = () => {
  const router = useRouter();
  const trip = useLocalSearchParams();
  
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM');
  };

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex w-full items-center">
        <Header text="Members" size="md"/>
      </View>
      <GroupMembers/>
      <View className="flex flex-col w-full items-center justify-center py-1">
        <Button text="Invite friends to this trip" type="plain" textType="bold" corners="rounded" size="lg"/>
        <Button text="Find other solo travellers" type="plain" textType="bold" corners="rounded" size="lg"/>
      </View>
      <NavigationBar/>
    </View>
  );
}

export default GroupPage;