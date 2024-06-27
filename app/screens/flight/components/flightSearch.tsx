import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import Modal from "react-native-modal";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';

type FlightSearchProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FlightSearch = ({ isPopupVisible, setPopupVisible }: FlightSearchProps) => {
  const trip = useLocalSearchParams();
  const router = useRouter();
  const[from, setFrom] = useState("");
  const[to, setTo] = useState("");
  const[flightDate, setFlightDate] = useState("");
  const[returnDate, setReturnDate] = useState("");
  const {userId, getToken} = useAuth();

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
    setFrom("");
    setTo("");
    setFlightDate("");
    setReturnDate("");
  }

  const handleSearchFlights = () => {
    setPopupVisible(!isPopupVisible);
    router.push({pathname: 'flights', params: trip});
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible} onBackdropPress={() => setPopupVisible(!isPopupVisible)}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/3 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
              <Header text="Search for Flights!" size="lg" padding="none" verticalPadding={false}/>
              <View className="flex flex-col h-1/2 w-full items-center pt-2">
                <TextField placeholder="Flight From" value={from} onChangeText={setFrom}/>
                <TextField placeholder="Flight To" value={to} onChangeText={setTo}/>
                <TextField placeholder="Flight Date (YYYY-MM-DD)" value={flightDate} onChangeText={setFlightDate}/>
                <TextField placeholder="Return Date (YYYY-MM-DD)" value={returnDate} onChangeText={setReturnDate}/>
              </View>
              <View className="flex h-1/3 w-full items-center pt-4">
                <Button text="Find Flights" type="plain" textType="bold" size="lg" corners="rounded" onPress={handleSearchFlights}/>
              </View>          
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default FlightSearch;