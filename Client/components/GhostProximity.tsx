import { Ghost } from '../types/Types'
import Geolocation from 'react-native-geolocation-service'
import { Permission } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      
      

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, [userLocation]);


// on location change event? maybe triger the getLocation function every few seconds or something? 
// let locationUpdate
// useEffect(() => {
//     // for ghost of ghosts
//     // if location lat <= ghost lat + x && location long <= ghost long + x 
//     //      open the ghost pop-up/radar
//     locationUpdate = setInterval(getLocation, 1000);

// })

