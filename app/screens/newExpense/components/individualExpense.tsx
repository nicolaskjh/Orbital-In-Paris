import React from 'react';
import { View, Text } from 'react-native';
import TextField from '@/components/textField';
import ProfilePicture from '@/components/profilePicture';
import { useState } from 'react';

type IndividualExpenseProps = {
  name: string;
  participants: { name: string, amount: string, user_id: string }[];
  setParticipants: React.Dispatch<React.SetStateAction<{ name: string, amount: string, user_id: string }[]>>;
};

const IndividualExpense = ({name, participants, setParticipants}: IndividualExpenseProps) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    const updatedParticipants = participants.map(participant =>
      participant.name === name ? { ...participant, amount: newAmount } : participant
    );
    setParticipants(updatedParticipants);
    console.log(participants);
  };

  return (
    <View className="flex flex-row w-full justify-between items-center px-4 pb-2">
      <View className="flex flex-row items-center">
        <ProfilePicture size="sm"/>
        <Text className="text-base pl-2">{name}</Text>
      </View>
      <TextField placeholder="Amount" value={amount} type="sm" onChangeText={handleAmountChange}/>
    </View>
  );
};

export default IndividualExpense;