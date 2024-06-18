import React from 'react';
import { View } from 'react-native';
import Button from '@/components/button';

const BudgetTabs = () => {
  return (
    <View className="flex flex-row w-full items-center justify-between py-1 px-8">
      <Button text="Settle Expenses" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding"/>
      <Button text="Balances" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding"/>
      <Button text="Total Expenses" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding"/>
    </View>
  );
}

export default BudgetTabs;