import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import Modal from "react-native-modal";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createItinerary, joinInviteCode } from 'utils/supabaseRequests';
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
  const[inviteCode, setInviteCode] = useState("");
  const {userId, getToken} = useAuth();
  const [newTrip, setNewTrip] = useState(true);

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

  const addThroughInvite = async () => {
    const token = await getToken({ template: 'supabase' });
    const res = await joinInviteCode ({userId, token, inviteCode});
    router.replace('home');
  }

  const changeTripType = () => {
    setNewTrip(!newTrip);
    setErrorMessage("");
  }

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
    setNewTrip(true);
    setCountry("");
    setCity("");
    setStartDate("");
    setEndDate("");
    setErrorMessage("");
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible} onBackdropPress={() => setPopupVisible(!isPopupVisible)}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-2/5 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
            {newTrip ? (
              <> 
                <Header text="Plan a New Trip!" size="xl" padding="none" verticalPadding={false}/>
                <View className="flex flex-col h-1/2 w-full items-center pt-2">
                  <TextField placeholder="Country" value={country} onChangeText={setCountry}/>
                  <TextField placeholder="City" value={city} onChangeText={setCity}/>
                  <TextField placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate}/>
                  <TextField placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate}/>
                  {errorMessage ? <Text className="text-sm text-red-500">{errorMessage}</Text> : null}
                </View>
                <View className="flex h-1/3 w-full items-center pt-3">
                  <Button text="Create Trip" type="plain" textType="bold" size="lg" corners="rounded" onPress={handleCreateNewItinerary}/>
                  <Button text="Already have an invite code?" type="borderless" size="fit" onPress={changeTripType}/>
                </View>  
              </>
            ) : (
              <>
                <Header text="Join a Trip!" size="xl" padding="none" verticalPadding={false}/>
                <View className="flex flex-col h-1/2 w-full justify-center items-center pt-2">
                  <TextField placeholder="Invite Code" value={inviteCode} onChangeText={setInviteCode}/>
                  {errorMessage ? <Text className="text-sm text-red-500">{errorMessage}</Text> : null}
                </View>
                <View className="flex h-1/3 w-full items-center pt-3">
                  <Button text="Join Trip" type="plain" textType="bold" size="lg" corners="rounded" onPress={addThroughInvite}/>
                  <Button text="Create a new trip instead" type="borderless" size="fit" onPress={changeTripType}/>
                </View>
              </>
          )}
            

          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NewTrip;