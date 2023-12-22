import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Slide = (props) => {
  const { title } = props;

  return (
    <View style={styles.slide}>
      <Text style={{ ...styles.slideText }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 200,
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
  },
});

export default Slide;
