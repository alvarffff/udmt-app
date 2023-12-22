import React from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";

export const Stat = (props) => {
  const { label, value } = props;

  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    borderColor: "#50858b",
    borderWidth: 1.5,
    borderRadius: 30,
    width: Dimensions.get("window").width / 3 - 30,
    height: 110,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#F1FFFE",
  },
  statText: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 10,
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
    marginHorizontal: 10,
  },
});

export default Stat;
