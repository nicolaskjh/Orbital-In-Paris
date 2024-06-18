import React from 'react';
import { View, Text } from 'react-native';

type BalancePreviewProps = {
  balance: number;
}

const BalancePreview = ( {balance}: BalancePreviewProps ) => {
  const textColour = balance > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <View className="flex flex-col justify-start w-full bg-white py-2 pl-8">
      <Text className={`text-base font-bold ${textColour}`}>You owe $10 overall</Text>
      <Text className={`text-md ${textColour} pb-0.5`}>Tom owes you $5</Text>
      <Text className={`text-md ${textColour} pb-0.5`}>You owe Jerry $15</Text>
      <Text className="text-md text-black pb-0.5">Plus 3 other balances</Text>
    </View>
  )
}

export default BalancePreview;