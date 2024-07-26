import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from '@/components/header';
import TextField from '@/components/textField';
import Button from '@/components/button';

type InvitePopupProps = {
  isPopupVisible: boolean,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tripCode: string,
}

const InvitePopup = ({ isPopupVisible, setPopupVisible }: InvitePopupProps) => {
  const [message, setMessage] = React.useState("");

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/4 w-5/6 pb-4 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
              <Header text="Send a message and an" size="md" padding="none" verticalPadding={false} textAlign="center"/>
              <Header text="invite to (name)!" size="md" padding="none" verticalPadding={false} textAlign="center"/>
              <View className="flex-1 flex-col w-full items-center py-2">
                <TextField placeholder="Message" value={message} onChangeText={setMessage}/>
              </View>
              <Button text="Send Invite" type="plain" textType="bold" size="lg" corners="rounded"/>
            </View>
        </View>
      </Modal>
    </View>
  )
}

export default InvitePopup;