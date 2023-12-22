import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import MapView, { Polyline, Circle, Marker } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
import routes from "../api/routes";
import Geojson from "react-native-geojson";
import { Text, Input, Button } from "react-native-elements";
import TrackForm from "../components/TrackForm";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Map = () => {
  const {
    state: { name, currentLocation, locations, geoJson, endLocation },
    changeName,
    searchRoute,
    deleteRoute,
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={[StyleSheet.absoluteFill, { flexDirection: "column" }]}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true} //Interesante para un futuro
      // followsUserLocation="true"
    >
      {geoJson !== null ? (
        <View style={{}}>
          {endLocation ? (
            <Marker
              coordinate={{
                longitude: endLocation[0],
                latitude: endLocation[1],
              }}
            />
          ) : null}

          <Geojson
            geojson={geoJson}
            strokeColor="#50858B"
            fillColor="#50858B"
            strokeWidth={5}
            onPress={() => console.log("test")}
          />
        </View>
      ) : null}

      <View style={{ position: "absolute", top: 0, rigth: 400, width: 400 }}>
        <SearchBar
          term={name}
          onTermChange={changeName}
          onTermSubmit={() => searchRoute(currentLocation, name)}
          onFocus={deleteRoute}
        />
      </View>
      {/* <Polyline coordinates={locations.map((loc) => loc.coords)} /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
  input: {
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 70,
  },
});

export default Map;
