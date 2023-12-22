//import "../_mockLocation";
import React, { useContext, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Map from "../components/Map";
import { Text, Button, Input } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";

import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import Spacer from "../components/Spacer";
import routes from "../api/routes";

const TrackCreateScreen = ({ navigation, isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );

  const [err] = useLocation(isFocused || state.recording, callback);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map />
      {/* <NavigationEvents onWillBlur={() => {}} /> */}
      {err ? <Text> Please enable location services </Text> : null}
      {/* <Spacer>
        <TrackForm styles={{ zIndex: 1, marginTop: -10 }}></TrackForm>
      </Spacer> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
});

export default withNavigationFocus(TrackCreateScreen);
