import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Text, View, StyleSheet } from "react-native";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    flex: 1,
  },
});

export default ResolveAuthScreen;
