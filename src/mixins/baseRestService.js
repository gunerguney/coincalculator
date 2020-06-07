import axios from 'axios';

export function authGet(url, apiKey, successCallback, failCallback) {
    const headers = {
      'X-CMC_PRO_API_KEY': apiKey,
      'Content-Type': 'application/json',
    };
    
    axios.get(url, { headers: headers })
      .then(response => {
        //console.info('Response: ' + JSON.stringify(response.data))
        successCallback(response.data);
      }).catch(err => {
        console.log(JSON.stringify(err));
        failCallback(err);
      })
  }

export function authGet2(url, apiKey, successCallback, failCallback){

  const rp = require('request-promise');
  const requestOptions = {
    method: 'GET',
    uri: url,
    qs: {
      'start': '1',
      'limit': '5000',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };

  rp(requestOptions).then(response => {
    //console.log('API call response:', response);
    console.info('Response: ' + JSON.stringify(response.data))
    successCallback(response.data);
  }).catch((err) => {
    console.log(JSON.stringify(err));
        failCallback(err);
  });


}