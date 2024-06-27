import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';

type AccomsSearch = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccomsSearch = ({ isPopupVisible, setPopupVisible }: AccomsSearch) => {
  const trip = useLocalSearchParams();
  const router = useRouter();
  const[location, setLocation] = useState("");
  const[numberAdults, setNumberAdults] = useState("");
  const[checkIn, setCheckIn] = useState("");
  const[checkOut, setCheckOut] = useState("");
  const[sortBy, setSortBy] = useState("");
  const {userId, getToken} = useAuth();

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
    setLocation("");
    setNumberAdults("");
    setCheckIn("");
    setCheckOut("");
    setSortBy("");
  }

  const handleSearchAccoms = () => {
    setPopupVisible(!isPopupVisible);
    console.log("Routing to accommodation page")
    router.replace({pathname: 'accommodation', params: trip})
    console.log("Routed successfully")
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible} onBackdropPress={() => setPopupVisible(!isPopupVisible)}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-2/5 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
              <Header text="Search for Accommodation!" size="lg" padding="none" verticalPadding={false}/>
              <View className="flex flex-col h-3/5 w-full items-center pt-2">
                <TextField placeholder="Location" value={location} onChangeText={setLocation}/>
                <TextField placeholder="Number Of Adutls" value={numberAdults} onChangeText={setNumberAdults}/>
                <TextField placeholder="Check In Date (YYYY-MM-DD)" value={checkIn} onChangeText={setCheckIn}/>
                <TextField placeholder="Check Out Date (YYYY-MM-DD)" value={checkOut} onChangeText={setCheckOut}/>
                <Dropdown 
                  style={{width: '80%', borderWidth: 1, borderRadius: 32, borderColor: 'black', marginBottom: 4, paddingHorizontal: 8}}
                  placeholderStyle={{color: 'grey', fontSize: 14, padding: 0}}
                  selectedTextStyle={{color: 'black', fontSize: 14, padding: 0}}
                  placeholder="Sort By" 
                  value={sortBy} 
                  labelField="label"
                  valueField="value"
                  data={[
                    {label: 'Price', value: 'price'},
                    {label: 'Popularity', value: 'popularity'},
                  ]}
                  onChange={(item) => setSortBy(item.value)}
                />
              </View>
              <View className="flex h-1/3 w-full items-center pt-4">
                <Button text="Find Accommodation" type="plain" textType="bold" size="lg" corners="rounded" onPress={handleSearchAccoms}/>
              </View>          
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AccomsSearch;