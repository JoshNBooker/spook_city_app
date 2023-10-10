import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Location, User } from "../types/Types";

interface MapComponentProps {
  locations: Location[];
  users: User[];
}

const MapComponent: React.FC<MapComponentProps> = ({ locations, users }) => {
  return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.9486,
          latitudeDelta: 0.08,
          longitude: -3.1999,
          longitudeDelta: 0.08,
        }}
        showsUserLocation={true}
      >
        {locations.map((location, index) => {
          return (
            <Marker
              coordinate={{
                latitude: location.coordinateX,
                longitude: location.coordinateY,
              }}
              key={index}
              pinColor='Blue'
            />
          );
        })}
      </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
    backgroundColor: '#0000FF'
  }
});

export default MapComponent;
