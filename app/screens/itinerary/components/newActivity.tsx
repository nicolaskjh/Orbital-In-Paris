import React from "react";
import { View } from "react-native";
import TextField from "@/components/textField";
import Modal from "react-native-modal";
import Button from "@/components/button";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

import { createNewActivity } from 'utils/supabaseRequests';

type NewActivityProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  trip: any;
};

const NewActivity = ({ isPopupVisible, setPopupVisible, trip }: NewActivityProps) => {
  const router = useRouter();
  const [activity, setActivity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState(""); 
  const { getToken } = useAuth();

  const addNewActivity = async () => {
    const token = await getToken({ template: 'supabase' });
    const newActivity = {
      activity,
      location,
      time,
      date,
      trip
    }
    const act = await createNewActivity({token, newActivity});
    router.replace({pathname: 'itinerary', params: trip});
    return (
      setPopupVisible(!isPopupVisible)
    );
  }

  return (
    <View className="flex flex-col justify-between items-center w-full bg-white">
      <Modal isVisible={isPopupVisible}>
        <View className="flex justify-center items-center h-full">
          <View className="flex flex-col justify-between items-center h-1/3 w-4/5 pb-5 bg-white rounded-xl">
            <View className="flex flex-row w-full justify-end px-1">
              <Button text="X" type="borderless" textType="bold" size="fit" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
            </View>
            <TextField placeholder="Activity" value={activity} border="bottom" secureEntry={false} onChangeText={(activity) => setActivity(activity)}/>
            <TextField placeholder="Location" value={location} border="bottom" secureEntry={false} onChangeText={(location) => setLocation(location)}/>
            <TextField placeholder="Date" value={date} border="bottom" secureEntry={false} onChangeText={(date) => setDate(date)}/>
            <TextField placeholder="Time" value={time} border="bottom" secureEntry={false} onChangeText={(time) => setTime(time)}/>
            <Button text="Add Activity" type="plain" textType="bold" size="lg" corners="rounded" onPress={addNewActivity}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewActivity;