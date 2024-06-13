import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from '@/components/header';
import Button from '@/components/button';

const Invite = ({ isPopupVisible, setPopupVisible }: NewTripProps) => {
 
  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/6 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
            <Header text="Invite your friends with this code!" size="md" padding="none" verticalPadding={false} textAlign="center"/>
            <View className="flex flex-col h-2/5 w-full items-center py-2">
              <Text>Placeholder code</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Invite;