import React from "react";
import { View, Text } from "react-native";
import TextField from "@/components/textField";
import Modal from "react-native-modal";
import Button from "@/components/button";
import { useAuth } from "@clerk/clerk-expo";
import { parseISO } from "date-fns";
import { createNewActivity } from 'utils/supabaseRequests';

type NewActivityProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  trip: any;
  onActivitySubmit: (date: Date) => void;
};

const NewActivity = ({isPopupVisible, setPopupVisible, trip, onActivitySubmit}: NewActivityProps) => {
  const [activity, setActivity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState(""); 
  const [errorMessage, setErrorMessage] = React.useState("");
  const { getToken } = useAuth();

  const addNewActivity = async () => {
    setErrorMessage("");

    if (activity === "" || location === "" || time === "" || date === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const parsedDate = parseISO(date);
    if (parsedDate < parseISO(trip.start_date) || parsedDate > parseISO(trip.end_date)) {
      setErrorMessage("Date must be within trip duration");
      return;
    }

    const token = await getToken({ template: 'supabase' });
    const newActivity = {
      activity,
      location,
      time,
      date,
      trip
    }

    const act = await createNewActivity({token, newActivity});
    onActivitySubmit(parseISO(date));

    setActivity("");
    setLocation("");
    setTime("");
    setDate("");

    return (
      setPopupVisible(!isPopupVisible)
    );
  }

  const exitPopup = () => {
    setPopupVisible(!isPopupVisible);

    setActivity("");
    setLocation("");
    setTime("");
    setDate("");
    setErrorMessage("");
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
              <TextField placeholder="Activity" value={activity} border="bottom" secureEntry={false} onChangeText={(activity) => setActivity(activity)}/>
              <TextField placeholder="Location" value={location} border="bottom" secureEntry={false} onChangeText={(location) => setLocation(location)}/>
              <TextField placeholder="Date (YYYY-MM-DD)" value={date} border="bottom" secureEntry={false} onChangeText={(date) => setDate(date)}/>
              <TextField placeholder="Time (24h)" value={time} border="bottom" secureEntry={false} onChangeText={(time) => setTime(time)}/>
              {errorMessage ? <Text className="text-sm text-red-500">{errorMessage}</Text> : null}
            </View>
            <Button text="Add Activity" type="plain" textType="bold" size="lg" corners="rounded" onPress={addNewActivity}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewActivity;