import React from "react";
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import Header from '@/components/header';
import Users from "./components/users";
import InvitePopup from "./components/invitePopup";
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatDate } from "@/functions/formatDate";

const InvitePage = () => {
  const router = useRouter();
  const trip = useLocalSearchParams();
  const [isPopupVisible, setPopupVisible] = React.useState(false);

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex w-full items-center">
        <Header text="Users" size="md"/>
      </View>
      <Users trip={trip} isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NavigationBar/>
    </View>
  );
}

export default InvitePage;