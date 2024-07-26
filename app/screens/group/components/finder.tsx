import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import { useLocalSearchParams, useRouter } from 'expo-router';

type FinderProps = {
  isPopupVisible: boolean,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  trip: any,
}

const Finder = ({ isPopupVisible, setPopupVisible, trip }: FinderProps) => {
  const [range, setRange] = React.useState("");
  const router = useRouter();
 
  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  const handleSearch = () => {
    setPopupVisible(!isPopupVisible);
    router.push({pathname: 'invite', params: trip});
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/4 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
            <Header text="Find other solo travellers!" size="md" padding="none" verticalPadding={false} textAlign="center"/>
            <View className="flex-1 flex-col w-full items-center py-2 items-center justify-center">
              <TextField placeholder="Select age range" value={range} onChangeText={setRange}/>
            </View>
            <Button text="Search" type="plain" textType="bold" size="lg" corners="rounded" onPress={handleSearch}/>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Finder;