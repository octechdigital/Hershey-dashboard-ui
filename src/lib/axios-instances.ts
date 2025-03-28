import axios from "axios";

export const BaseUrlApi = axios.create({
  baseURL: "https://thedigitalapps.com/hersheys/api/",
  // baseURL: "https://thedigitalapps.com/eastman_battery/api/",
  // baseURL: "https://www.jeetharkharidpar.com/api/",
});
