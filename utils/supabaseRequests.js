import { supabaseClient } from "./supabaseClient";
import { parseISO, differenceInCalendarDays} from "date-fns";

export const getItineraries = async ({userId,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('groups')
        .select('itinerary(*)')
        .eq('user_id', userId)
    return data;
}

export const getItinerariesFromId = async ({id,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('itinerary')
        .select('*')
        .eq('id', id)
        .order('start_date', {ascending: true});
    return data;
}

export const createItinerary = async ({userId,token,itinerary}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('itinerary')
        .insert(
            {"country" : itinerary.country,
            "city" : itinerary.city,
            "start_date" : itinerary.startDate,
            "end_date" : itinerary.endDate,
            "owner" : userId
            }
        ).select('id');

    const numberOfDays = differenceInCalendarDays(parseISO(itinerary.endDate),parseISO(itinerary.startDate));
    for (let i =0; i < numberOfDays + 1; i++){
        await supabase.from('days').insert({
            "itinerary" : data[0].id,
            "day": i
        })
    }

    const {data:data2,error:error2} = await supabase
        .from('groups')
        .insert({
            "user_id" : userId,
            "itinerary" : data[0].id
        })
    return data;
}

export const createNewActivity = async ({token,newActivity}) => {
    const supabase = await supabaseClient(token);
    const Day = differenceInCalendarDays(parseISO(newActivity.date),parseISO(newActivity.trip.start_date));
    console.log(newActivity.trip.id)
    const {data:number, error:error1} = await supabase.from('days').select('id').eq('itinerary',newActivity.trip.id).eq('day',Day);
    console.log(number[0].id);
    const {data,error:error2} = await supabase
        .from('activities')
        .insert(
            {"activity" : newActivity.activity,
            "location" : newActivity.location,
            "time" : newActivity.time,
            "date" : newActivity.date,
            "day" : number[0].id
            }
        ).select('*');
    console.log(error2);
    return data;
}

export const getActivities = async ({token,trip}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('days')
        .select('activities(*)')
        .eq('itinerary',trip);
    return data;
}

export const createProfile = async ({token,profile}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('profiles')
        .insert({
            "name" : profile.name,
            "country" : profile.country,
            "interests" : profile.interests,
            "dateOfBirth" : profile.dateOfBirth,
            "user_id" : profile.userId
        }).select("*")
    return data;
}

export const getProfile = async ({userId,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId);
    return data;
}