import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Map from "../components/Map";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import newsApi from "../api/news";
import Carousel from "../components/Caruosel";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context as DataContext } from "../context/DataContext";
import { ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
// import { BleManager, Device } from "react-native-ble-plx";

// const manager = new BleManager();

const HomeScreen = () => {
  const [results, setResults] = useState([]);
  const { state, getEcu0, getLastData } = useContext(DataContext);
  const MINUTE_MS = 10000;

  const searchApi = async (searchTerm) => {
    try {
      const response = await newsApi.get("", {
        params: {
          rss_url: "https://www.hibridosyelectricos.com/rss",
          api_key: "2d578gsyz8tesdmnah2mdvdweozd67pzvfuedo7h",
          order_by: "pubDate",
          count: 5,
        },
      });

      setResults(response.data);
    } catch (err) {
      console.log(err);
    }
    // console.log("Nueva lectura");
    // console.log(results);
  };

  const getBatteryName = () => {
    if (state.lastData === null) {
      return "battery-quarter";
    } else {
      if (
        state.lastData.data[15].qSocIn === null ||
        state.lastData.data[15].qSocIn === undefined
      ) {
        return "battery-quarter";
      } else {
        if (state.lastData.data[15].qSocIn >= 100) {
          return "battery-full";
        } else if (
          state.lastData.data[15].qSocIn < 100 &&
          state.lastData.data[15].qSocIn >= 75
        ) {
          return "battery-3";
        } else if (
          state.lastData.data[15].qSocIn < 75 &&
          state.lastData.data[15].qSocIn >= 50
        ) {
          return "battery-2";
        } else if (
          state.lastData.data[15].qSocIn < 50 &&
          state.lastData.data[15].qSocIn >= 25
        )
          return "battery-1";
        else if (state.lastData.data[15].qSocIn < 25) {
          return "battery-quarter";
        }
      }
    }
  };

  useEffect(() => {
    searchApi();
    getLastData();
    getEcu0();

    const interval = setInterval(() => {
      getLastData();
    }, MINUTE_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#ECECEC",
        }}
        forceInset={{ top: "always" }}
      >
        <View style={styles.container}>
          <View style={styles.data}>
            <View style={styles.stat}>
              <FontAwesome5
                style={styles.iconTemp}
                name="temperature-low"
                size={35}
                color="#5497a7"
              />
              <View style={{ width: 260 }}>
                <Text style={styles.statText}>Temperatura exterior</Text>
              </View>
              <View style={styles.circulo}>
                {state.lastData === null ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.valueText}>
                    {state.lastData.data[3].tempExt}ºC
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.stat}>
              <Ionicons
                name="water-outline"
                style={{
                  ...styles.iconTemp,
                  marginLeft: 5,
                  fontWeight: "bold",
                }}
                size={40}
                color="#5497a7"
              />
              <View style={{ width: 260 }}>
                <Text style={styles.statText}>Humedad exterior</Text>
              </View>
              <View style={styles.circulo}>
                {state.lastData === null ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.valueText}>
                    {state.lastData.data[3].humExt}%
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons
                name="clock-outline"
                style={{ ...styles.iconTemp, marginLeft: 5 }}
                size={40}
                color="#5497a7"
              />
              <View style={{ width: 260 }}>
                <Text style={styles.statText}>Presión exterior</Text>
              </View>
              <View style={styles.circulo}>
                {state.lastData === null ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{ ...styles.valueText, fontSize: 15, marginTop: 13 }}
                  >
                    {state.lastData.data[3].presExt} bares
                  </Text>
                )}
              </View>
            </View>
            <View>
              <View style={styles.bateria}>
                <FontAwesome
                  name={getBatteryName()}
                  style={{
                    ...styles.iconTemp,
                    transform: [{ rotate: "-90deg" }],
                    marginLeft: 5,
                    marginTop: 25,
                  }}
                  size={50}
                  color="#5497a7"
                />

                {state.lastData === null ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{
                      ...styles.valueText,
                      marginLeft: 0,
                      fontSize: 45,
                      fontWeight: "normal",
                    }}
                  >
                    {state.lastData.data[15].qSocIn}%
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ flex: 2 }}>
            <Carousel
              style="news"
              itemsPerInterval={1}
              items={[
                {
                  url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[0].link,
                  title:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[0].title,
                  image_url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[0].enclosure.link,
                  pubDate:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[0].pubDate,
                },
                {
                  url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[1].link,
                  title:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[1].title,
                  image_url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[1].enclosure.link,
                  pubDate:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[1].pubDate,
                },
                {
                  url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[2].link,
                  title:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[2].title,
                  image_url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[2].enclosure.link,
                  pubDate:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[2].pubDate,
                },
                {
                  url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[3].link,
                  title:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[3].title,
                  image_url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[3].enclosure.link,
                  pubDate:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[3].pubDate,
                },
                {
                  url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[4].link,
                  title:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[4].title,
                  image_url:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[4].enclosure.link,
                  pubDate:
                    results.items === undefined
                      ? "cargando..."
                      : results.items[4].pubDate,
                },
              ]}
            />
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
    // borderWidth: 1,
    // borderColor: "red",
  },
  circulo: {
    borderRadius: 100,
    borderColor: "#A1D2CE",
    borderWidth: 2,
    height: 65,
    width: 65,
    marginLeft: 10,
    marginTop: 2,
  },
  valueText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 17,
    fontWeight: "bold",
    color: "#50858b",
  },
  iconTemp: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginLeft: 15,
  },
  text: {
    marginTop: 10,
    marginBottom: -30,
    fontWeight: "bold",
  },

  data: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 2,
    // flexDirection: "row",
    marginTop: 40,
  },
  stat: {
    borderColor: "#50858b",
    borderWidth: 1,
    borderRadius: 15,
    width: Dimensions.get("window").width - 10,
    height: 70,
    marginHorizontal: 5,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginBottom: -10,
  },
  bateria: {
    borderColor: "#50858b",
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width / 2 - 10,
    height: 110,
    marginHorizontal: 100,
    marginTop: 45,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginBottom: -10,
  },
  statText: {
    textAlign: "left",
    marginTop: 20,
    fontSize: 25,
    marginLeft: 10,
    color: "#5497a7",
    fontWeight: "bold",
  },
  statHold: {
    width: "100%",
    marginBottom: 8,
  },
  statLabel: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 5,
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
