// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});

// fetchMyIP((error, ip) => {
//   if(error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Return IP: ", ip);
// });

// fetchCoordsByIP('24.84.5.145', (error, coordinates) => {
//   if(error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Coordinates: ", coordinates);
// });

// let coords = { latitude: '49.2732', longitude: '-123.0124' };

// fetchISSFlyOverTimes(coords, (error, flyover) => {
//   if(error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! ISS Fly Over Times: ", flyover);
// });
