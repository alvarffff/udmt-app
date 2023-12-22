import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <View style={{ marginBottom: 20, marginLeft: -10 }}>
        <Spacer>
          <Text h2> {headerText} </Text>
        </Spacer>
      </View>
      <Input
        label="Nombre"
        value={name}
        onChangeText={(newName) => setName(newName)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label="Contraseña"
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ name, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
});

export default AuthForm;
