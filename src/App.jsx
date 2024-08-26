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
    <div className="py-8 m-auto w-fit max-w-[max(78rem,75vw)]">
      <Search
        onInputChange={handleInputChange}
        onSearch={onSearch}
        inputValue={inputValue}
        geoData={geo}
      ></Search>
      <div className="results flex max-lg:flex-wrap max-lg:justify-center gap-y-8">
        <div className="flex flex-col gap-y-8">
          <Current
            data={
              data
                ? Utils().compileInfo(data.current, data.current_units)
                : null
            }
          />
          <Hourly data={data} />
        </div>
        <Daily data={data} />
      </div>
    </div>
  );
}

function Current({ data }) {
  return (
    <div className="current uppercase relative w-[42rem] h-96 ">
      <SvgPanel />
      {data && (
        <div className="content px-20 pt-11 text-xl">
          <h1 className="time text-3xl">{data.formatted_time}</h1>
          <div className="info flex justify-evenly ">
            <div className="stats mt-4 ml-6 mr-4 ">
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
            <div className="code flex flex-col items-center w-1/2">
              <i
                className={
                  "wi text-shadow-sm shadow-white text-[9rem] mt-4 " +
                  data.interpreted_code.icon
                }
              ></i>
              <div className="desc text-shadow shadow-white text-center">
                {data.interpreted_code.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Daily({ data }) {
  if (!data) return <div>Loading...</div>;
  else
    return (
      <div className="daily relative flex flex-col justify-center content-center">
        <h1 className="text-3xl font-bold text-center mt-4 mb-6 shadow-white text-shadow">
          WEEKLY FORECAST
        </h1>
        <div className="flex gap-x-2 gap-y-8 justify-center content-center flex-wrap ">
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 0)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 1)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 2)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 3)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 4)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 5)}
          ></Day>
          <Day
            data={Utils().compileInfo(data.daily, data.daily_units, 6)}
          ></Day>
        </div>
      </div>
    );
}

function Day({ data }) {
  const weatherDescription = data.interpreted_code.description;
  return (
    <div className="day uppercase w-[14em] h-[9em] bg-[100%_auto] relative font-semibold max-md:text-xl">
      <SvgBoxTabbed />
      <div className="content pt-[0.25em] pl-[2.75em] pr-[0.25em] tracking-tight min-h-[7em]">
        <div className="-ml-8 font-bold text-shadow-sm shadow-[orchid] h-6">
          <span className="time text-[1.05em] text-[hotpink] shadow-white text-shadow-sm align-baseline -mt-1">
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
            "wi text-shadow-sm shadow-white text-[2.5em] mx-1.5 mt-2 float-right " +
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

function Hourly({ data }) {
  if (!data) return <div>Loading...</div>;

  const [day, setDay] = useState(0);
  const arr = Array(24).fill("a");
  const listHours = arr.map((_, index) => {
    const n = 24 * day + index;
    return (
      <Hour
        key={n}
        data={Utils().compileInfo(data.hourly, data.hourly_units, n)}
      />
    );
  });

  return (
    <div className="hourly container uppercase ml-10 text-white bg-[navy] bg-opacity-40 border-4 white box-shadow purplish min-h-80 h-[calc(100vh-36.5rem)] w-fit flex flex-col p-4">
      <h1
        className="text-3xl font-bold text-shadow shadow-white text-center mb-4"
        role="caption"
      >
        Hourly Forecast
      </h1>
      <div className="table-header grid text-magenta text-shadow shadow-[navy] font-bold w-fit">
        <span className="inline-block text-center">Time</span>
        <span className="inline-block text-center">Weather</span>
        <span className="inline-block text-center">Temp</span>
        <span className="inline-block text-center">Feel</span>
        <span className="inline-block text-center">Precip</span>
        <span className="mr-6 inline-block text-center">Humidity</span>
        {/* <th className="w-28 text-center ">Cloud Cover</th>
                <th className="w-28 text-center ">Wind</th> */}
      </div>
      <div className="table-body grid overflow-y-scroll scroller w-fit">
        {listHours}
      </div>
    </div>
  );
}
function Hour({ data }) {
  return (
    <>
      <span className="text-center py-1">
        {data.time.substring(6).split("T").join(" ")}
      </span>
      <span
        className={
          "text-center py-1.5 wi text-lg " + data.interpreted_code.icon
        }
        title={data.interpreted_code.description}
      ></span>
      <span className="text-center py-1 ">{data.temperature_2m}</span>
      <span className="text-center py-1 ">{data.apparent_temperature}</span>
      <span className="text-center py-1 ">
        {data.precipitation_probability}
      </span>
      <span className="text-center py-1 ">{data.relative_humidity_2m}</span>
      {/* <td className="text-center py-1 ">{data.cloud_cover}</td>
      <td className="text-center py-1 ">
        {data.wind_speed_10m} {data.wind_direction_10m}
      </td> */}
    </>
  );
}
function Search({ onInputChange, onSearch, inputValue, geoData }) {
  return (
    <div className="mx-10 mb-16 min-w-96 max-w-full relative">
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

      <div className="mt-8 relative">
        <input
          type="text"
          id="lookupGeocode"
          placeholder="Lookup location..."
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          className="h-12 p-4 rounded-sm w-2/3 text-xl border-white border-double border-4 bg-purple-3 purplish"
        />
        <SvgButton onClick={onSearch} text="SEARCH"></SvgButton>
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

export default App;
