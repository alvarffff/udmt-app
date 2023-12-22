import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigatorRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };

    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

// const signup = (dispatch) => {
//   return async ({ email, password }) => {
//     try {
//       const response = await trackerApi.post("/signup", { email, password });
//       await AsyncStorage.setItem("token", response.data.token);
//       dispatch({
//         type: "signin",
//         payload: response.data.token,
//       });

//       navigate("Home");
//     } catch (err) {
//       dispatch({
//         type: "add_error",
//         payload: "Something went wrong with sign up",
//       });
//     }
//   };
// };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signin = (dispatch) => {
  return async ({ name, password }) => {
    try {
      const response = await trackerApi.post("udmtdb/signin", {
        name,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: response.data.token,
      });

      navigate("Home");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: signin, payload: token });
    navigate("Home");
  } else {
    navigate("loginFlow");
  }
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
