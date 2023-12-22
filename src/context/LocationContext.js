import routes from "../api/routes";
import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };

    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "get_route":
      return {
        ...state,
        geoJson: action.payload.geoJson,
        name: action.payload.name,
        endLocation: action.payload.endLocation,
      };

    case "change_name":
      return {
        ...state,
        name: action.payload,
        geoJson: null,
      };

    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: "change_name", payload: name });
};

const startRecording = (dispatch) => () => {
  dispatch({
    type: "start_recording",
  });
};

const stopRecording = (dispatch) => async () => {
  dispatch({
    type: "stop_recording",
  });
};

const addLocation = (dispatch) => (location, recording) => {
  dispatch({
    type: "add_current_location",
    payload: location,
  });
  if (recording) {
    dispatch({
      type: "add_location",
      payload: location,
    });
  }
};

const searchRoute = (dispatch) => async (location, endLocation) => {
  try {
    const response = await routes.get("/geocode/search", {
      params: {
        api_key: "5b3ce3597851110001cf62486697f709df834916858f86cd5d64425d",
        text: endLocation,
      },
    });
    console.log("SEGUIMOS");
    // console.log(response.data);

    const endCoordinates = response.data.features[0].geometry.coordinates;

    const start =
      "" + location.coords.longitude + "," + location.coords.latitude;
    const end = "" + endCoordinates[0] + "," + endCoordinates[1];

    console.log(endCoordinates);
    const geoJson = await routes.get("/v2/directions/driving-car", {
      params: {
        api_key: "5b3ce3597851110001cf62486697f709df834916858f86cd5d64425d",
        start: start,
        end: end,
      },
    });

    if (!geoJson.isLoading) {
      dispatch({
        type: "get_route",
        payload: {
          geoJson: geoJson.data,
          name: endLocation,
          endLocation: endCoordinates,
        },
      });
    } else {
      console.log("cargando");
    }
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    changeName,
    startRecording,
    stopRecording,
    addLocation,
    searchRoute,
  },
  {
    name: "",
    recording: false,
    locations: [],
    currentLocation: null,
    geoJson: null,
    endLocation: null,
  }
);
