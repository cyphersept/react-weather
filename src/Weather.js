function APIs() {
  const geoEndpoint = "https://geocoding-api.open-meteo.com/v1/search";
  const weatherEndpoint = "https://api.open-meteo.com/v1/forecast";
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

  const requestGeo = async (params) => await requestApi(params, geoEndpoint);
  const requestWeather = async (params) =>
    await requestApi(params, weatherEndpoint);

  return { requestWeather, requestGeo };
}

export { APIs };
