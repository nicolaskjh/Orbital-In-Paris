import { supabaseClient } from "./supabaseClient";

export const getItineraries = async ({userId,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('itinerary')
        .select('*')
        .eq('owner', userId);
    return data;
}

export const createItinerary = async ({userId,token,itinerary}) => {
    const supabase = await supabaseClient(token);
    console.log(itinerary);
    console.log(userId);
    const {data,error} = await supabase
        .from('itinerary')
        .insert(
            {"country" : itinerary.country,
            "city" : itinerary.city,
            "start_date" : itinerary.startDate,
            "end_date" : itinerary.endDate,
            "owner" : userId
            }
        );
    return data;
}