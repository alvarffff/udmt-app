import axios from "axios";

export default axios.create({
  baseURL: "https://api.openrouteservice.org",
  headers: {
    Authorization:
      "#######################################",
  },
});
