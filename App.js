import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";

import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as DataProvider } from "./src/context/DataContext";

import { setNavigator } from "./src/navigatorRef";
import HomeScreen from "./src/screens/HomeScreen";
import StadisticsScreen from "./src/screens/StadisticsScreen";
import BatteryScreen from "./src/screens/BatteryScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const trackListFlow = createStackNavigator(
  {
    TrackCreate: TrackCreateScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Mapas",
    },

    navigationOptions: {
      tabBarIcon: (
        <MaterialCommunityIcons name="google-maps" size={24} color="black" />
      ),
    },
  }
);

const home = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Inicio",
      headerShown: false,
    },
    navigationOptions: {
      tabBarIcon: <AntDesign name="home" size={24} color="black" />,
    },
  }
);

const stadistics = createStackNavigator(
  {
    Stadistics: StadisticsScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Estadísticas",
      headerShown: false,
    },
    navigationOptions: {
      tabBarIcon: <Octicons name="graph" size={24} color="black" />,
    },
  }
);

// const battery = createStackNavigator(
//   {
//     Battery: BatteryScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitle: "Batería",
//       headerShown: false,
//     },
//     navigationOptions: {
//       tabBarIcon: (
//         <MaterialCommunityIcons name="battery-medium" size={24} color="black" />
//       ),
//     },
//   }
// );

const account = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Cuenta",
    },
    navigationOptions: {
      tabBarIcon: (
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={24}
          color="black"
        />
      ),
    },
  }
);

const mainflow = createBottomTabNavigator(
  {
    Home: home,
    Stadistics: stadistics,
    trackListFlow: trackListFlow,
    // Battery: battery,
    Account: account,
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: mainflow,
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <DataProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </DataProvider>
  );
};
