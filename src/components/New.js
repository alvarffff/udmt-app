import React from "react";
import { Dimensions } from "react-native";
import { View, StyleSheet, Image, Button } from "react-native";
import { Text } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";

export const New = (props) => {
  const { date, title, url, image_url, pubDate } = props;

  return (
    <View style={styles.new}>
      <Image
        style={styles.image}
        source={{
          uri: image_url,
        }}
      />

      <Text style={styles.fecha}>{pubDate}</Text>
      <Text
        onPress={async () => WebBrowser.openBrowserAsync(url)}
        style={styles.newText}
        h3
      >
        {title}
      </Text>

      <TouchableOpacity onPress={async () => WebBrowser.openBrowserAsync(url)}>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "#5497a7",
            marginLeft: 300,
            marginBottom: 10,
          }}
        >
          Leer más
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  new: {
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "center",
    justifyContent: "center",
    height: 400,
  },
  newText: {
    textAlign: "left",

    fontWeight: "bold",

    marginBottom: 5,
    marginLeft: 10,
  },
  image: {
    width: 390,
    borderRadius: 40,
    height: 250,
    zIndex: -1,
    flex: 1,
  },
  fecha: {
    textAlign: "left",
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    color: "#50858B",
  },
});

export default New;
