import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "getEcu0":
      return {
        ...state,
        rpm: action.payload.rpm,
        vMotor: action.payload.vMotor,
        iMotor: action.payload.iMotor,
      };
    case "getLastData":
      return {
        ...state,
        lastData: action.payload,
      };
    default:
      return state;
  }
};

const getEcu0 = (dispatch) => {
  return async (dias, horas, minutos) => {
    let dataRpm = [];
    let dataVMotor = [];
    let dataIMotor = [];

    try {
      const responses = await trackerApi.post("udmtdb/allData", {
        id: "ecu0",
        dias: 1,
      });

      for (let k = 0; k < responses.data.response.length; k++) {
        var tiempo = new Date(responses.data.response[k].time);
        var tiempoFormated = tiempo.getHours;

        dataRpm = [
          ...dataRpm,
          {
            time: tiempo,
            RPM: responses.data.response[k].fields.rpmMotor,
          },
        ];

        dataVMotor = [
          ...dataVMotor,
          {
            time: tiempo,
            voltaje: parseInt(responses.data.response[k].fields.vMotor),
          },
        ];

        dataIMotor = [
          ...dataIMotor,
          {
            time: tiempo,
            intensidad: responses.data.response[k].fields.iMotor,
          },
        ];
      }

      // for (let in responses.data) {
      //   console.log(response[0].fields.rpmMotor);
      // }
      dispatch({
        type: "getEcu0",
        payload: { rpm: dataRpm, vMotor: dataVMotor, iMotor: dataIMotor },
      });
    } catch (err) {
      console.log(err);
    }
    // };
  };
};

const getLastData = (dispatch) => {
  return async () => {
    try {
      const responses = await trackerApi.post("udmtdb/lastData");
      //console.log(responses.data);
      dispatch({
        type: "getLastData",
        payload: responses.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const { Provider, Context } = createDataContext(
  dataReducer,
  {
    getEcu0,
    getLastData,
  },
  {
    rpm: [],
    vMotor: [],
    iMotor: [],
    lastData: null,
  }
);
