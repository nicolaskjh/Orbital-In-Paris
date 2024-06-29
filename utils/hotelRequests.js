import axios from 'axios' 

const getDestId = async (location) => {
    res = await axios.request({
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
      params: {
        name: location,
        locale: 'en-gb'
      },
      headers: {
        'x-rapidapi-key': '028ea6e38emshc167d7f308d7783p14478fjsnf0e6d9633ef9',
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    });
    destId = res.data[0].dest_id;
    return destId;
  };

export const getHotelList = async (bookingDetails) => {
    try  {
        const destId = await getDestId(bookingDetails.location);
    } catch (error) {
        console.error(error);
    }
    res = await axios({
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      params: {
        checkout_date: bookingDetails.checkout_date,
        order_by: bookingDetails.sort_by,
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
        'x-rapidapi-key': '028ea6e38emshc167d7f308d7783p14478fjsnf0e6d9633ef9',
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    });
    return res.data.result;
  }