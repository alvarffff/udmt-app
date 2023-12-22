import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TrackForm = () => {
  const {
    state: { name, recording, locations, currentLocation },
    startRecording,
    stopRecording,
    searchLocation,
    changeName,
  } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      {/* <Input
        containerStyle={styles.input}
        leftIcon={
          <MaterialCommunityIcons name="google-maps" size={30} color="black" />
        }
        inputContainerStyle={{ borderBottomWidth: 0, marginBottom: -25 }}
        value={name}
        onChangeText={changeName}
        placeholder="Buscar destino aquí"
        onBlur={() => searchLocation(currentLocation, name)}
      /> */}

      <Spacer>
        {recording ? (
          <Button
            style={styles.button}
            buttonStyle={styles.buttonSTOPStyle}
            title="Stop"
            onPress={stopRecording}
          />
        ) : (
          <Button
            style={styles.button}
            buttonStyle={styles.buttonGOStyle}
            title="GO"
            onPress={startRecording}
          />
        )}
      </Spacer>
      {/* <Spacer>
        {!recording && locations.length ? (
          <Button title="Save Recording" />
        ) : null}
      </Spacer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: -30,
  },
  button: {
    marginTop: 525,
    borderRadius: 20,
    alignSelf: "center",
    textShadowColor: "blue",
  },

  buttonGOStyle: {
    backgroundColor: "rgba(25, 76, 73, 0.5)",
    borderRadius: 1000,
    borderColor: "black",
    borderWidth: 1,
    width: 75,
    height: 75,
    color: "black",
  },
  buttonSTOPStyle: {
    backgroundColor: "rgba(200, 44, 62, 0.5)",
    borderRadius: 1000,
    borderColor: "black",
    borderWidth: 1,
    width: 75,
    height: 75,
    color: "black",
  },
});

export default TrackForm;
