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
    <div className="py-8 m-auto max-w-[84rem]">
      <Search
        onInputChange={handleInputChange}
        onSearch={onSearch}
        inputValue={inputValue}
        geoData={geo}
      ></Search>
      <div className="results flex ">
        <div className="flex flex-col ">
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
    <div className="current uppercase relative w-[42rem] h-96 mb-4 ">
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
      <div className="flex gap-2 justify-center flex-wrap max-w-[50%] mt-8 ">
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

function Hourly({ data }) {
  if (!data) return <div>Loading...</div>;

  const [day, setDay] = useState(0);
  const arr = Array(24);
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
    <div className="hourly ml-10 ">
      <table className="uppercase table-fixed text-white bg-[navy] bg-opacity-40 border-4 border- white box-shadow purplish ">
        <caption className="text-3xl font-bold mb-2 text-shadow shadow-white ">
          Hourly Forecast
        </caption>
        <div className="p-6 overflow-y-scroll scroller">
          <thead className="text-magenta text-shadow shadow-[navy] font-bold ">
            <tr>
              <th className="w-32 text-center ">Time</th>
              <th className="w-20 text-center ">Weather</th>
              <th className="w-20 text-center ">Temp</th>
              <th className="w-20 text-center ">Feel</th>
              <th className="w-20 text-center ">Precip</th>
              <th className="w-20 text-center ">Humidity</th>
              {/* <th className="w-28 text-center ">Cloud Cover</th>
              <th className="w-28 text-center ">Wind</th> */}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-purple-6 ">
            <Hour
              data={Utils().compileInfo(data.hourly, data.hourly_units, 0)}
            />
            <Hour
              data={Utils().compileInfo(data.hourly, data.hourly_units, 1)}
            />
            <Hour
              data={Utils().compileInfo(data.hourly, data.hourly_units, 2)}
            />
            <Hour
              data={Utils().compileInfo(data.hourly, data.hourly_units, 3)}
            />
          </tbody>
        </div>
      </table>
    </div>
  );
}
function Hour({ data }) {
  return (
    <tr>
      <th scope="row">{data.time.substring(6).split("T").join(" ")}</th>
      <td className="text-center py-1.5 ">
        <p
          className={"wi text-lg " + data.interpreted_code.icon}
          title={data.interpreted_code.description}
        >
          {" "}
        </p>
      </td>
      <td className="text-center py-1 ">{data.temperature_2m}</td>
      <td className="text-center py-1 ">{data.apparent_temperature}</td>
      <td className="text-center py-1 ">{data.precipitation_probability}</td>
      <td className="text-center py-1 ">{data.relative_humidity_2m}</td>
      {/* <td className="text-center py-1 ">{data.cloud_cover}</td>
      <td className="text-center py-1 ">
        {data.wind_speed_10m} {data.wind_direction_10m}
      </td> */}
    </tr>
  );
}
function Search({ onInputChange, onSearch, inputValue, geoData }) {
  return (
    <div className="mx-10 mb-16 min-w-[36rem] relative">
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
          className="h-12 p-4 rounded-sm w-1/2 text-xl border-white border-double border-4 bg-purple-3 purplish"
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
