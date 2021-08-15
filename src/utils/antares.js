import axios from 'axios';

export const getLatestData = () => {
  const URL = 'https://platform.antares.id:8443/~/antares-cse/antares-id/Modacar/Raspberry01/la';
  const headerObj = {
    'X-M2M-Origin': 'a736ed57b4509598:8ef02d7f4839ddce',
    'Content-Type': 'application/json;ty=4',
    Accept: 'application/json'
  };
  axios
    .get(URL, { headers: headerObj })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(`error ${error}`);
    });
};
