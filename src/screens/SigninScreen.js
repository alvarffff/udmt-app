import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 150, flex: 3 }}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
          headerText="Inicia sesión en tu cuenta"
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Iniciar sesión"
        />
        <Text style={{ color: "#50858B" }}>
          ¿No tienes cuenta? Habla con el soporte técnico para asignar una
          cuenta a tu moto.
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{
            marginLeft: 20,
            resizeMode: "contain",
            width: null,
            height: null,
            flex: 1,
          }}
          source={require("../../assets/udmt2.png")}
        />
      </View>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 150,
  },
});

export default SigninScreen;
