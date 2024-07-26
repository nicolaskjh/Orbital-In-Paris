import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from '@/components/header';
import TextField from '@/components/textField';
import Button from '@/components/button';
import { useAuth } from '@clerk/clerk-react';
import { sendInvites } from '@/utils/supabaseRequests';

type InvitePopupProps = {
  isPopupVisible: boolean,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tripCode: string,
  invitation: any
}

const InvitePopup = ({ isPopupVisible, setPopupVisible, tripCode, invitation }: InvitePopupProps) => {
  const [message, setMessage] = React.useState("");

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  const {userId, getToken} = useAuth();

  const handleOnPress = () => {
    const total = `${message} Invite code is ${tripCode}`;
    const sendInvite = async () => {
      try {
        const token = await getToken({ template: 'supabase' });
        await sendInvites({token, userId,id:invitation, message:total});
      } catch (error) {
        console.error(error);
      }
    }
    sendInvite();
    exitPopup();
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-1/4 w-5/6 pb-4 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
              <Header text="Send a message!" size="md" padding="none" verticalPadding={false} textAlign="center"/>
              <View className="flex-1 flex-col w-full items-center py-2">
                <TextField placeholder="Message" value={message} onChangeText={setMessage}/>
              </View>
              <Button text="Send Invite" type="plain" textType="bold" size="lg" corners="rounded" onPress = {handleOnPress}/>
            </View>
        </View>
      </Modal>
    </View>
  )
}

export default InvitePopup;