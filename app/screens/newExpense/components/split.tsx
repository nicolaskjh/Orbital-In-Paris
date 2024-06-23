import React from 'react';
import { View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Button from '@/components/button';
import IndividualExpense from './individualExpense';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { getMembers } from '@/utils/supabaseRequests';

type SplitProps = {
  trip: any;
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  participants: { name: string, amount: string, user_id: string }[];
  setParticipants: React.Dispatch<React.SetStateAction<{ name: string, amount: string, user_id: string }[]>>;
};

const Split = ( {trip, isPopupVisible, setPopupVisible, participants, setParticipants}: SplitProps ) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [members, setMembers] = React.useState([]);
  const {userId, getToken} = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const members = await getMembers({token,trip});
      setMembers(members);
      setParticipants(members.map(member => ({name: member.profiles.name, amount: "0", user_id: member.profiles.id})));
      } catch (error) {
        console.error(error);
      }
    }
    fetchMembers();
    console.log(members);
    console.log(participants);
    setIsLoading(false);
  }, []);

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  const saveSplit = () => {
    console.log(participants)
    setPopupVisible(!isPopupVisible);
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible} onBackdropPress={() => setPopupVisible(!isPopupVisible)}>
        <View className="flex justify-center items-center h-full">
            <View className="flex flex-col justify-between items-center h-3/5 w-5/6 pb-5 bg-white rounded-xl">
              <View className="flex flex-row w-full justify-end px-1">
                <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={exitPopup}/>
              </View>
              <ScrollView className="flex-1 w-full">
                {!isLoading && members.map((member) => {
                  return (
                    <IndividualExpense key={member.profiles.id} name={member.profiles.name} participants={participants} setParticipants={setParticipants}/>
                )})}
              </ScrollView>
              <View className="flex flex-row w-full justify-center">
                <Button text="Save" type="plain" size="lg" corners="rounded" onPress={saveSplit}/>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Split;