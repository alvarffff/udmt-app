import React from "react";
import { StyleSheet } from "react-native";
import Map from "../components/Map";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";

const BatteryScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>BatteryScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BatteryScreen;
