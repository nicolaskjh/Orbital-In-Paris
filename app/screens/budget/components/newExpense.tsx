import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import TextField from '@/components/textField';
import Button from '@/components/button';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { set } from 'date-fns';

type NewExpenseProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewExpense = ({isPopupVisible, setPopupVisible}: NewExpenseProps) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [paidByOpen, setPaidByOpen] = useState(false);
  const [paidBy, setPaidBy] = useState("");
  const [paidByItems, setPaidByItems] = useState([]);
  const [splitOpen, setSplitOpen] = useState(false);
  const [split, setSplit] = useState("");
  const [splitItems, setSplitItems] = useState([]);

  const exitPopup = () => {
    setCategory("");
    setDescription("");
    setPrice("");
    setPopupVisible(!isPopupVisible);
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible} onBackdropPress={() => setPopupVisible(!isPopupVisible)}>
        <View className="flex justify-center items-center h-full">
          <View className="flex flex-col justify-between items-center h-1/3 w-4/5 pb-5 bg-white rounded-xl">
            <View className="flex flex-row w-full justify-end px-1">
              <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={() => exitPopup()}/>
            </View>
            <View className="flex flex-col h-3/5 w-full justify-start items-center">
              <TextField placeholder="Category" value={category} border="bottom" secureEntry={false} onChangeText={(category) => setCategory(category)}/>
              <TextField placeholder="Description" value={description} border="bottom" secureEntry={false} onChangeText={(description) => setDescription(description)}/>
              <TextField placeholder="Price" value={price} border="bottom" secureEntry={false} onChangeText={(price) => setPrice(price)}/>
              <View className="flex-1 flex-row w-full justify-center items-center py-1">  
                <Text>Paid by </Text>
                <Text> split </Text>
              </View>
            </View>
            <Button text="Add Expense" type="plain" textType="bold" size="lg" corners="rounded"/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewExpense;