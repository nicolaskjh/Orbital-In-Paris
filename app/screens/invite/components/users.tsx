import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import User from './user';
import { useAuth } from '@clerk/clerk-react';
import { getPeople } from '@/utils/supabaseRequests';
import  InvitePopup  from './invitePopup';
import { differenceInCalendarYears } from 'date-fns';

type UsersProps = {
  trip: any;
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  invitee: number;
  setInvitee: React.Dispatch<React.SetStateAction<number>>;
};

const Users = ({trip, isPopupVisible, setPopupVisible, invitee, setInvitee}: UsersProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const {userId, getToken} = useAuth();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const users = await getPeople({token, userId, range: trip.range});
      setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPeople();
    setIsLoading(false);
    console.log(trip)
  }, []);

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t">
      {users.map((user) => {
        return (
          <User
            key={user.id}
            name={user.name}
            age={user.age}
            interests={user.interests}
            id = {user.id}
            isPopupVisible={isPopupVisible}
            setPopupVisible={setPopupVisible}
            user={invitee}
          />
      )})}
    </ScrollView>
  );
}

export default Users;