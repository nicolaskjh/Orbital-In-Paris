import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import Modal from "react-native-modal";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createItinerary } from 'utils/supabaseRequests';
import { useAuth } from '@clerk/clerk-expo';
import { isBefore, parseISO } from 'date-fns';

type NewTripProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTrip = ({ isPopupVisible, setPopupVisible }: NewTripProps) => {
  const router = useRouter();
  const[country, setCountry] = useState("");
  const[city, setCity] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate, setEndDate] = useState("");
  const[errorMessage, setErrorMessage] = useState("");
  const {userId, getToken} = useAuth();

  const handleCreateNewItinerary = async () => {
    setErrorMessage("");

    if (country === "" || city === "" || startDate === "" || endDate === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const parsedStartDate = parseISO(startDate);
    const parsedEndDate =  parseISO(endDate);
    if (isBefore(parsedEndDate, parsedStartDate)) {
      setErrorMessage("End date cannot be before start date");
      return;
    }

    const token = await getToken({ template: 'supabase' });
    const itinerary = {
      country,
      city,
      startDate,
      endDate
    }
    const iti = await createItinerary({userId, token, itinerary});
    router.replace('home');
  }

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);

    setCountry("");
    setCity("");
    setStartDate("");
    setEndDate("");
    setErrorMessage("");
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/3 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
            <Header text="Plan a New Trip!" size="xl" padding="none" verticalPadding={false}/>
            <View className="flex flex-col h-3/5 w-full items-center">
              <TextField placeholder="Country" value={country} onChangeText={setCountry}/>
              <TextField placeholder="City" value={city} onChangeText={setCity}/>
              <TextField placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate}/>
              <TextField placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate}/>
              {errorMessage ? <Text className="text-sm text-red-500">{errorMessage}</Text> : null}
            </View>
            <View className="flex h-1/6 w-full items-center">
              <Button text="Create Trip" type="plain" textType="bold" size="lg" corners="rounded" onPress={handleCreateNewItinerary}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NewTrip;