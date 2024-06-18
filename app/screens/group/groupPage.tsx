import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import Header from '@/components/header';
import GroupMembers from './components/groupMembers';
import Button from '@/components/button';
import Invite from './components/invite';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatDate } from '@/functions/formatDate';

const GroupPage = () => {
  const router = useRouter();
  const trip = useLocalSearchParams();
  const [isPopupVisible, setPopupVisible] = React.useState(false);

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex w-full items-center">
        <Header text="Members" size="md"/>
      </View>
      <GroupMembers trip={trip}/>
      <View className="flex flex-col w-full items-center justify-center py-1">
        <Button text="Invite friends to this trip" type="plain" textType="bold" corners="rounded" size="lg" onPress={() => setPopupVisible(!isPopupVisible)}/>
        <Button text="Find other solo travellers" type="plain" textType="bold" corners="rounded" size="lg"/>
      </View>
      <Invite isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} tripCode = {trip.invite_code}/>
      <NavigationBar/>
    </View>
  );
}

export default GroupPage;