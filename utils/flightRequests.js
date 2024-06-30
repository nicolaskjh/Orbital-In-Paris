import axios from 'axios'
const getDestId = async (location) => {
    res = await axios.request({
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
        params: {query: location},
        headers: {
          'x-rapidapi-key': '228bfff73fmsh166907e1a9c89b4p153b68jsnc6cd9eef59e6',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
      });
    destId = res.data.data[0].presentation.skyId;
    return destId;
}

export const getFlightList = async (flightDetails) => {
    try  {
        const hi = await getDestId(flightDetails.from);
        const bye = await getDestId(flightDetails.to);
        console.log(flightDetails)
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
              'x-rapidapi-key': '228bfff73fmsh166907e1a9c89b4p153b68jsnc6cd9eef59e6',
              'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
          });
        return res.data.data.itineraries;
    } catch (error) {
        console.error(error.toJSON());
    }
  }