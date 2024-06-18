import React from 'react';
import { View, Text } from 'react-native';

type BalancePreviewProps = {
  balance: number;
}

const BalancePreview = ( {balance}: BalancePreviewProps ) => {
  const textColour = balance > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <View className="flex flex-col justify-start w-full bg-white pt-2 pl-8">
      <Text className={`text-base font-bold ${textColour}`}>You owe $10 overall</Text>
    </View>
  )
}

export default BalancePreview;