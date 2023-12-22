import React, { useState, useEffect, useContext } from "react";

import Map from "../components/Map";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import Spacer from "../components/Spacer";
import trackerApi from "../api/tracker";
import { Context as DataContext } from "../context/DataContext";
import { ActivityIndicator } from "react-native";
import Carousel from "../components/Caruosel";
import Stat from "../components/Stat";

let data2 = [
  { time: 1, RPM: 13000 },
  { time: 2, RPM: 16500 },
  { time: 3, RPM: 14250 },
  { time: 4, RPM: 19000 },
];

const StadisticsScreen = () => {
  const { state, getEcu0, getLastData } = useContext(DataContext);
  const [pulsado, setPulsado] = useState(false);
  const [prueba, setData] = useState([]);
  let dias,
    horas,
    minutos = 0;
  const MINUTE_MS = 10000;

  useEffect(() => {
    const interval = setInterval(() => {
      getLastData();
      getEcu0();
      console.log(state.rpm);
    }, MINUTE_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#ECECEC" }}
        forceInset={{ top: "always" }}
      >
        <View style={styles.container}>
          <Carousel
            style="graphs"
            itemsPerInterval={1}
            items={[
              {
                title: "RPM",
                data: state.rpm,
                x: "time",
                y: "RPM",
                description: "Revoluciones por minuto",
              },
              {
                title: "VOLTAJE",
                data: state.vMotor,
                x: "time",
                y: "voltaje",
                description: "Voltaje del motor",
              },
              {
                title: "INTENSIDAD",
                data: state.iMotor,
                x: "time",
                y: "intensidad",
                description: "Intensidad del motor",
              },
            ]}
          />
          <View style={styles.stat}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>ECU</Text>
            <View style={{ flexDirection: "row" }}>
              {state.lastData === null ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Stat
                    value={state.lastData.data[2].tempMotor}
                    label="Temp Motor (ºC)"
                  />
                  <Stat
                    value={state.lastData.data[2].tempECU}
                    label="Temp ECU (ºC)"
                  />
                </>
              )}
            </View>
          </View>

          <View style={styles.stat}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Acelerómetro (m/s2)
            </Text>
            <View style={{ flexDirection: "row" }}>
              {state.lastData === null ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Stat value={state.lastData.data[4].acX} label="X" />
                  <Stat value={state.lastData.data[4].acY} label="Y" />
                  <Stat value={state.lastData.data[4].acZ} label="Z" />
                </>
              )}
            </View>
          </View>

          <View style={styles.stat}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Giroscopio</Text>
            <View style={{ flexDirection: "row" }}>
              {state.lastData === null ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Stat value={state.lastData.data[5].giroX} label="X" />
                  <Stat value={state.lastData.data[5].giroY} label="Y" />
                  <Stat value={state.lastData.data[5].giroZ} label="Z" />
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#A1D2CE",
    backgroundColor: "#ECECEC",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F7FFFF",
    // borderColor: "#C7D6D7",
    // borderWidth: 2,
    // borderRadius: 70,
    // marginHorizontal: 20,
    // marginVertical: 20,
    //paddingTop: 20,
  },
  text: {
    marginTop: 10,
    marginBottom: -30,
    fontWeight: "bold",
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#50858B",
    borderWidth: 2,
    borderRadius: 20,
    // width: width - 20,
    // height: height / 3,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowOpacity: 0.1,
    elevation: 5,
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: -20,

    width: Dimensions.get("window").width - 20,
  },
});

export default StadisticsScreen;
