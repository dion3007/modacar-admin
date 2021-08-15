import axios from 'axios';

export const getLatestData = () => {
  const URL = 'http://localhost:9000/antares-data';
  axios
    .get(URL)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(`error ${error}`);
    });
};
