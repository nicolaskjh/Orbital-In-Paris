import axios from 'axios'
const getDestId = async (location) => {
    res = await axios.request({
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
        params: {query: location},
        headers: {
          'x-rapidapi-key': '9955fe3d24msh1219bc8085b2659p139cdcjsnd0cc73aabcb9',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
      });
    destId = res.data.data[0].presentation.skyId;
    return destId;
}

export const getFlightList = async (flightDetails) => {
    console.log(flightDetails)
    try  {
        const hi = await getDestId(flightDetails.from);
        const bye = await getDestId(flightDetails.to);
        res = await axios({
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip',
            params: {
              fromEntityId: hi,
              toEntityId: bye,
              departDate: flightDetails.flightDate,
              returnDate: flightDetails.returnDate,
            },
            headers: {
              'x-rapidapi-key': '9955fe3d24msh1219bc8085b2659p139cdcjsnd0cc73aabcb9',
              'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
          });
          console.log(res.data.data.itineraries)
          return res.data.data.itineraries;
    } catch (error) {
        console.error(error);
    }
  }