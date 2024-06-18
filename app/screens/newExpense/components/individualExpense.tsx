import React from 'react';
import { View, Text } from 'react-native';
import TextField from '@/components/textField';
import ProfilePicture from '@/components/profilePicture';
import { useState } from 'react';

type IndividualExpenseProps = {
  name: string;
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
};

const IndividualExpense = ({name, participants, setParticipants}: IndividualExpenseProps) => {
  const [amount, setAmount] = useState("");

  return (
    <View className="flex flex-row w-full justify-between items-center pr-4 pl-2 py-1.5">
      <View className="flex flex-row items-center">
        <ProfilePicture size="sm"/>
        <Text className="text-base">{name}</Text>
      </View>
      <TextField placeholder="Amount" value={amount} type="sm" onChangeText={(amount) => setAmount(amount)}/>
    </View>
  );
};

export default IndividualExpense;