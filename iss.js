const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(Error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(Error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const { latitude, longitude } = JSON.parse(body);
    
    callback(null, { latitude, longitude });
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      callback(Error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const flyOverTime = JSON.parse(body).response;
    
    callback(null, flyOverTime);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return (Error, null);
    };
    fetchCoordsByIP(ip, (error, coordinates) => {
      if(error) {
        return (Error, null);
      };
      fetchISSFlyOverTimes(coordinates, (error, flyover) => {
        if(error) {
          return (Error, null);
        };
        // callback(null, flyover);

        let passDate = Date(flyover[0].risetime);

        console.log(`Next pass at ${passDate} for ${flyover[0].duration} seconds!`)
        
      });
    });
  });

};


module.exports = { nextISSTimesForMyLocation };