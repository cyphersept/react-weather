import { useState, useEffect } from "react";
import { APIs, Utils } from "./Weather.js";
import { SvgButton, SvgBoxTabbed, SvgPanel } from "./SVGs.jsx";
import "./index.css";
import "./css/weather-icons.min.css";

function App() {
  const [data, setData] = useState(null);
  const [geo, setGeo] = useState(null);
  const [inputValue, setInputValue] = useState("Seoul");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const onSearch = async () => {
    try {
      const geoResult = await APIs().requestGeo(inputValue);
      const weatherData = await APIs().requestWeather({
        latitude: geoResult.latitude,
        longitude: geoResult.longitude,
      });
      setGeo(geoResult);
      setData(weatherData);
    } catch (error) {
      console.error("Failed to find location: ", error);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <>
      <Search
        onInputChange={handleInputChange}
        onSearch={onSearch}
        inputValue={inputValue}
        geoData={geo}
      ></Search>
      <Current
        data={
          data ? Utils().compileInfo(data.current, data.current_units) : null
        }
      />
      <Daily data={data} />
    </>
  );
}

function Current({ data }) {
  if (!data) return <div>Loading...</div>;
  return (
    <div className="current uppercase relative w-[42rem] ">
      <SvgPanel />
      <div className="content px-20 py-10 text-xl">
        <h1 className="time text-3xl">{data.formatted_time}</h1>
        <div className="float-right mt-4">
          <i
            className={
              "wi text-shadow-sm shadow-white text-[9rem] " +
              data.interpreted_code.icon
            }
          ></i>
          <div className="desc text-shadow shadow-white ">
            {data.interpreted_code.description}
          </div>
        </div>
        <div className=" mt-4 ml-8 mr-4 ">
          <div className="temp">Temperature:// {data.temperature_2m}</div>
          <div className="feels-like">
            Feels like:// {data.apparent_temperature}°
          </div>
          <div className="humidity">
            Humidity:// {data.relative_humidity_2m}
          </div>
          <div className="precipitation">
            Precipitation:// {data.precipitation}
          </div>
          <div className="cloud">Cloud cover:// {data.cloud_cover}</div>
          <div className="wind">
            Wind:// &nbsp;
            {data.wind_speed_10m + " " + data.wind_direction_10m}
          </div>
        </div>
      </div>
    </div>
  );
}

function Daily({ data }) {
  if (!data) return <div>Loading...</div>;
  else
    return (
      <div className="flex gap-2 justify-center flex-wrap">
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 0)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 1)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 2)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 3)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 4)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 5)}></Day>
        <Day data={Utils().compileInfo(data.daily, data.daily_units, 6)}></Day>
      </div>
    );
}

function Day({ data }) {
  const weatherDescription = data.interpreted_code.description;
  return (
    <div className="day uppercase w-56 h-36 bg-[100%_auto] relative font-semibold">
      <SvgBoxTabbed />
      <div className="content pt-1 pl-11 pr-1 tracking-tight min-h-28">
        <div className="-ml-8 font-bold text-shadow-sm shadow-[orchid] h-6">
          <span className="time text-[1.05rem] text-[hotpink] shadow-white text-shadow-sm align-baseline -mt-1">
            {data.time.slice(5).replace("-", "/")} -{" "}
          </span>
          {weatherDescription.length < 14 ? (
            <span>{weatherDescription}</span>
          ) : (
            <Marquee content={weatherDescription} />
          )}
        </div>
        <i
          className={
            "wi text-shadow-sm shadow-white text-[1.5em] md:text-[2.5em] mx-2 mt-2 float-right " +
            data.interpreted_code.icon
          }
        ></i>
        <div className="temp mt-1.5 text-shadow-sm shadow-[orchid]">
          {data.apparent_temperature_min}
          <span className="text-[hotpink] font-bold"> / </span>
          {data.apparent_temperature_max}
        </div>
        <div className="feel text-shadow-sm shadow-[orchid]">
          {data.apparent_temperature_min}
          <span className="text-[hotpink] font-bold"> / </span>
          {data.apparent_temperature_max}
        </div>
        <div className="precipitation text-shadow-sm shadow-[orchid]">
          Precipitation: {data.precipitation_probability_max}
        </div>
      </div>
    </div>
  );
}

function Marquee({ content }) {
  return (
    <div className="wrapper inline-block overflow-hidden h-[1.375rem] ">
      <div className="text-scroll inline-block min-w-full whitespace-nowrap">
        {content}
      </div>
    </div>
  );
}

function Search({ onInputChange, onSearch, inputValue, geoData }) {
  return (
    <div className="my-8">
      <div className="float-left"></div>
      <label
        htmlFor="lookupGeocode"
        className="font-bold text-4xl text-white text-shadow shadow-white block "
      >
        LOCATION:{" "}
        {geoData
          ? geoData.name.concat(", ", geoData.country).toUpperCase()
          : "LOADING..."}
      </label>

      <div className="right mt-8 relative">
        <input
          type="text"
          id="lookupGeocode"
          placeholder="Lookup location..."
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          className="h-12 p-4 rounded-sm min-w-80 w-3/5 max-w-3/4 text-xl border-white border-double border-4 bg-purple-3 purplish"
        />
        <SvgButton onClick={onSearch} text="SEARCH"></SvgButton>
      </div>
    </div>
  );
}

export default App;
