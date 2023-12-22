import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator } from "react-native";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const { state } = useContext(DataContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={{ marginBottom: 200 }}>
        {state.lastData === null ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "#5497a7", fontSize: 20 }}>
            Nombre de la moto: {state.lastData.moto}
          </Text>
        )}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#C7D6D7",
            marginVertical: 20,
          }}
        />
        {state.lastData === null ? (
          <Text style={{ color: "#5497a7", fontSize: 20 }}>
            Estado del servidor: Offline
          </Text>
        ) : (
          <Text style={{ color: "#5497a7", fontSize: 20 }}>
            Estado del servidor: Online
          </Text>
        )}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#C7D6D7",
            marginVertical: 20,
          }}
        />
      </View>
      <View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#C7D6D7",
            marginVertical: 20,
          }}
        />
        <Text
          style={{
            color: "#50858b",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Sobre nosotros
        </Text>
        <Text style={{ color: "#5497a7", fontSize: 15 }}>
          {" "}
          El Deusto Moto Team, equipo fundado en 2014 y conocido por sus siglas
          UDMT, es un equipo formado por estudiantes que tiene como objetivo
          diseñar y fabricar una moto eléctrica inteligente para competir en el
          Barcelona Smart Moto Challenge. Gracias a esta aplicación podemos
          tener información disponible y en tiempo real de las distintas
          métricas de la moto.
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#C7D6D7",
            marginVertical: 20,
          }}
        />
        <Spacer>
          <Button type="outline" title="Cerrar sesión" onPress={signout} />
        </Spacer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
