import { weatherCodes } from "./codes.js";

function APIs() {
  const geoEndpoint = "https://geocoding-api.open-meteo.com/v1/search";
  const weatherEndpoint = "https://api.open-meteo.com/v1/forecast";
  const weatherParams = {
    latittude: 52.52,
    longitude: 13.41,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m",
    hourly: "temperature_2m",
  };
  const formatRequest = (params, endpoint) => {
    let str = endpoint.concat("?");
    for (const [param, val] of Object.values(params)) {
      str = str.concat(param, "=", [val].join(), "&");
    }
    str = str.slice(0, -1);
    return str;
  };

  const requestApi = async (params, endpoint) => {
    const url =
      typeof params === "string" ? params : formatRequest(params, endpoint);
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const requestGeo = async (params) =>
    await requestApi(
      typeof params == "string" ? { name: params, count: 1 } : params,
      geoEndpoint
    );
  const requestWeather = async (params) =>
    await requestApi({ ...weatherParams, ...params }, weatherEndpoint);

  return { requestWeather, requestGeo };
}

function Utils() {
  function interpretCode(code, isDay) {
    const dayOrNight = isDay === 1 ? "day" : "night";
    const codeInfo = weatherCodes[code][dayOrNight];
    console.log(codeInfo);
    return codeInfo;
  }

  function combine(obj, unitObj) {
    const combined = {};
    for (let key in obj) {
      combined[key] = obj[key] + (unitObj[key] ?? "");
    }
    return combined;
  }

  function compileInfo(obj, unitObj) {
    const combined = combine(obj, unitObj);
    combined.interpreted_code = interpretCode(obj.weather_code, obj.is_day);
    return combined;
  }
  return { compileInfo };
}

export { APIs, Utils };
