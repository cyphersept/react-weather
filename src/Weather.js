import { weatherCodes } from "./codes.js";

function APIs() {
  const geoEndpoint = "https://geocoding-api.open-meteo.com/v1/search";
  const weatherEndpoint = "https://api.open-meteo.com/v1/forecast";
  const weatherParams = {
    latittude: 52.52,
    longitude: 13.41,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
    hourly:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max",
  };

  // Convert request parameters to API url
  const formatRequest = (params, endpoint) => {
    let str = endpoint.concat("?");
    for (const [param, val] of Object.entries(params)) {
      str = str.concat(param, "=", [val].join(), "&");
    }
    return str.slice(0, -1);
  };

  // Template for individualizing fetch functions
  const requestApi = async (params, endpoint) => {
    const url =
      typeof params === "string" ? params : formatRequest(params, endpoint);
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const requestGeo = async (params) => {
    const data = await requestApi(
      typeof params == "string" ? { name: params, count: 1 } : params,
      geoEndpoint
    );
    return data.results[0];
  };
  const requestWeather = async (params) =>
    await requestApi({ ...weatherParams, ...params }, weatherEndpoint);

  return { requestWeather, requestGeo };
}

function Utils() {
  // Translates weather code to description and icon mapping found in codes.js
  function interpretCode(code, isDay) {
    const dayOrNight = isDay === 0 ? "night" : "day";
    const codeInfo = weatherCodes[code][dayOrNight];
    console.log(codeInfo);
    return codeInfo;
  }

  // Combines values with units for ease of display
  function combine(obj, unitObj) {
    const combined = {};
    for (let key in unitObj) {
      if (key == "time") combined[key] = obj[key];
      else combined[key] = obj[key] + unitObj[key];
    }
    return combined;
  }

  // Prettifies time string
  function formatTime(iso) {
    const date = new Date(iso);
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
    console.log(formatted);
    return formatted;
  }

  // Gets single unit for data that is returned in arrays (daily, hourly)
  function extractPortion(obj, index) {
    const day = {};
    for (const [key, val] of Object.entries(obj)) {
      day[key] = val[index];
    }
    return day;
  }

  // Process the API's json into more useful forms
  function compileInfo(obj, unitObj, index = null) {
    const myObj = index === null ? obj : extractPortion(obj, index);
    const combined = combine(myObj, unitObj);
    combined.interpreted_code = interpretCode(
      myObj.weather_code,
      myObj?.is_day
    );
    combined.formatted_time = formatTime(combined.time);
    return combined;
  }

  return { compileInfo };
}

export { APIs, Utils };
