import axios from 'axios' 

const getDestId = async (location) => {
    res = await axios({
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
      params: {
        name: location,
        locale: 'en-gb'
      },
      headers: {
        'x-rapidapi-key': EXPO_PUBLIC_BOOKING_API_KEY,
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    });

    destId = res[0].dest_id;
    return destId;
  };

export const getHotelList = async ({bookingDetails}) => {
    const destId = await getDestId(bookingDetails.location);
    res = await axios({
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      params: {
        checkout_date: bookingDetails.checkout_date,
        order_by: 'popularity',
        filter_by_currency: 'SGD',
        include_adjacency: 'true',
        categories_filter_ids: 'class::2,class::4,free_cancellation::1',
        room_number: '1',
        dest_id: destId,
        dest_type: 'city',
        adults_number: bookingDetails.adults_number,
        page_number: '0',
        checkin_date: bookingDetails.checkin_date,
        locale: 'en-gb',
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': EXPO_PUBLIC_BOOKING_API_KEY,
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    });

    return res.result;
  }