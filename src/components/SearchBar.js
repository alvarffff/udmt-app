import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit, deleteRoute }) => {
  return (
    <View style={styles.background}>
      <MaterialCommunityIcons
        style={{ marginLeft: 20, marginTop: 20 }}
        name="google-maps"
        size={32}
        color="#5497a7"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={() => onTermSubmit()}
        onFocus={() => deleteRoute}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },

  inputStyle: {
    fontSize: 18,
    flex: 1, //usa el espacio que puedas
    marginTop: 30,
  },

  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    flex: 1,
  },
});

export default SearchBar;
