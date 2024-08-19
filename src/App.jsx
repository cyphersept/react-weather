import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { APIs, compileInfo } from "./Weather.js";
import bg from "./assets/neon-bg-hd.webp";
import bg4k from "./assets/neon-bg-4k.webp";
import "./index.css";

function App() {
  const [data, setData] = useState(null);
  const [geo, setGeo] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const onSearch = async () => {
    try {
      const geoResult = await APIs().requestGeo(inputValue);
      const weatherData = await APIs().requestWeather({
        latitude: geoResult.latitude,
        longitude: geoResult.longitude
      });
      setGeo(geoResult);
      setData(weatherData);
    } catch (error) {
      console.error('Failed to find location: ', error)
    }
  }

  return (
    <>
      <Bg></Bg>
      <Search
        onInputChange={handleInputChange}
        onSearch={onSearch}></Search>

      <div className="card">
        <button
          onClick={async () => {
            try {
              const data = await APIs().requestWeather(weatherUrl);
              setData(data);
            } catch (error) {
              console.error('Failed to find location: ', error)
            }
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

function Current({ data }) {
  const obj = compileInfo(data.current, data.current_units);
  return (
    <div className="current">
      <div className="time"></div>
      <i className={obj.interpreted_code.icon}></i>
      <div className="desc">{obj.interpreted_code.description}</div>
      <div className="temp">{obj.temperature_2m}°</div>
      <div className="humidity">{obj.relative_humidity_2m}%</div>
      <div className="feels-like">Feels like: {obj.apparent_temperature}°</div>
      <div className="precipitation">{obj.precipitation}</div>
      <div className="wind">
        {obj.wind_speed_10m + " " + obj.wind_direction_10m}
      </div>
    </div>
  );
}

function Weekly({ weeklyData }) {
  return (
    <div className="flex gap-2">
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
      <Day day={dayData}></Day>
    </div>
  );
}

function Day({ dayData }) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="day"></div>
      <i className={weatherCode.icon}></i>
      <div className="desc">{weatherCode.description}</div>
      <div className="temp">{obj.temperature_2m}°</div>
      <div className="humidity">{obj.relative_humidity_2m}%</div>
      <div className="feels-like">Feels like: {obj.apparent_temperature}°</div>
      <div className="precipitation">{obj.precipitation}</div>
      <div className="wind"></div>
    </div>
  );
}

function Search({onInputChange, onSearch}) {

  useEffect(() => {
    const fetchData = async () => {
      const geoResponse = await APIs().requestGeo(inputValue);
      setGeo(geoResponse);
    };

  return (
    <>
      <label
        htmlFor="lookupGeocode"
        className="font-bold text-4xl text-white text-shadow shadow-white "
      >
        LOCATION:
      </label>

      <input
        type="text"
        id="lookupGeocode"
        placeholder="Lookup location..."
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
        className="h-12 p-4 rounded-sm w-3/4 max-w-96 text-xl "
      />
      <SvgButton
        onclick={onSearch}
        text="SEARCH"
      ></SvgButton>
    </>
  );
}

function Bg() {
  return (
    <img
      className="absolute bg-cover -z-10"
      src={bg}
      alt="Seoul Night Photo by Steve Roe"
      srcSet={bg + " 1920w, " + bg4k + " 3840w"}
    />
  );
}

function SvgButton({ text }) {
  return (
    <div className="searchButton relative w-80 inline-block color1 glow translate-y-1/2">
      <div className="absolute font-bold text-3xl left-[55%] text-shadow-sm shadow-white top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
        {text}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="1076.97 251.63 951.42 327.08"
        role="button"
      >
        <g>
          <polygon
            className="group3"
            points="1384.577,367.148 1336.55,415.174 1307.688,415.174 1344.421,378.441 1355.715,367.148     1344.421,355.855 1307.688,319.122 1336.55,319.122   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1352.563,319.119 1400.591,367.148 1352.563,415.176 1384.581,415.176 1432.609,367.148     1384.581,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1400.591,319.119 1448.619,367.148 1400.591,415.176 1432.609,415.176 1480.638,367.148     1432.609,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1448.619,319.119 1496.647,367.148 1448.619,415.176 1480.638,415.176 1528.666,367.148     1480.638,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1496.647,319.119 1544.676,367.148 1496.647,415.176 1528.666,415.176 1576.694,367.148     1528.666,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1544.676,319.119 1592.704,367.148 1544.676,415.176 1576.694,415.176 1624.723,367.148     1576.694,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1592.704,319.119 1640.732,367.148 1592.704,415.176 1624.723,415.176 1672.751,367.148     1624.723,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1640.732,319.119 1688.761,367.148 1640.732,415.176 1672.751,415.176 1720.779,367.148     1672.751,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1688.761,319.119 1736.789,367.148 1688.761,415.176 1720.779,415.176 1768.808,367.148     1720.779,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1736.789,319.119 1784.817,367.148 1736.789,415.176 1768.808,415.176 1816.836,367.148     1768.808,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1784.817,319.119 1832.846,367.148 1784.817,415.176 1816.836,415.176 1864.864,367.148     1816.836,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1832.846,319.119 1880.874,367.148 1832.846,415.176 1864.864,415.176 1912.893,367.148     1864.864,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1880.874,319.119 1928.902,367.148 1880.874,415.176 1912.893,415.176 1960.921,367.148     1912.893,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="1928.902,319.119 1976.931,367.148 1928.902,415.176 1960.921,415.176 2008.949,367.148     1960.921,319.119   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="2008.949,319.119 2008.949,319.119 1976.931,319.119 2008.949,351.138   "
          />
        </g>
        <g>
          <polygon
            className="group3"
            points="2008.949,383.157 1976.931,415.176 2008.949,415.176 2008.949,415.176   "
          />
        </g>
        <g>
          <polygon
            className="group2"
            points="2028.381,299.683 2028.381,434.613 1288.25,434.613 1295.095,427.769 2021.536,427.769     2021.536,306.528 1295.095,306.528 1288.25,299.683   "
          />
        </g>
        <g>
          <g>
            <g>
              <path
                className="group2"
                d="M1256.514,290.534l-76.614,76.614l76.614,76.614l15.994-15.994l60.621-60.621L1256.514,290.534z       M1256.514,418.597l-51.471-51.449l51.471-51.449l51.449,51.449L1256.514,418.597z"
              />
            </g>
            <g>
              <path
                className="fill-white"
                d="M1165.298,367.148l45.608-45.608l-3.993-3.993l-38.307,38.307l-11.293,11.293l11.293,11.294      l56.742,56.742l3.97-3.993L1165.298,367.148z"
              />
            </g>
          </g>
        </g>
        <g>
          <path
            className="group1"
            d="M1367.146,251.656l-38.854,38.855h265.822l16.017-15.994h96.053l22.861-22.861H1367.146z     M1703.353,267.673H1607.3l-16.017,15.994h-246.475l25.188-25.165h342.527L1703.353,267.673z"
          />
        </g>
        <g>
          <path
            className="group2"
            d="M1875.176,283.667h-258.978l-22.861,22.861h304.699L1875.176,283.667z"
          />
        </g>
        <g>
          <polygon
            className="group1"
            points="1488.888,443.762 1466.05,466.623 1385.991,466.623 1353.981,498.656 1216.222,498.656     1252.521,462.357 1271.093,443.762   "
          />
        </g>
        <g>
          <polygon
            className="group2"
            points="1370.687,498.656 1388.984,480.358 1480.474,480.358 1517.07,443.762 1809.837,443.762     1791.539,462.06 1517.07,462.06 1480.474,498.656   "
          />
        </g>
        <g>
          <path
            className="group2"
            d="M1229.318,431.191l-3.97,3.993l-99.27,99.247l-2.441,2.441c-1.369-1.848-2.988-3.468-4.836-4.837    l100.844-100.844l-64.042-64.043l50.467-50.445l4.837,4.837l-45.608,45.608L1229.318,431.191z"
          />
        </g>
        <path
          className="group2"
          d="M1126.078,534.431c-1.415-1.803-3.034-3.422-4.837-4.837c-4.654-3.605-10.495-5.772-16.815-5.772   c-15.149,0-27.447,12.297-27.447,27.424c0,15.15,12.298,27.447,27.447,27.447c15.127,0,27.424-12.297,27.424-27.447   C1131.851,544.926,1129.683,539.085,1126.078,534.431z M1104.426,575.27c-13.278,0-24.024-10.746-24.024-24.025   c0-13.255,10.746-24.001,24.024-24.001c5.407,0,10.381,1.78,14.374,4.791c1.848,1.369,3.468,2.989,4.836,4.837   c3.012,3.993,4.792,8.966,4.792,14.373C1128.428,564.524,1117.682,575.27,1104.426,575.27z"
        />
        <path
          className="group1"
          d="M1104.426,541.115c-5.612,0-10.153,4.541-10.153,10.13c0,5.613,4.54,10.153,10.153,10.153   c5.59,0,10.13-4.541,10.13-10.153C1114.557,545.656,1110.016,541.115,1104.426,541.115z"
        />
        <g>
          <g>
            <path
              className="group1"
              d="M1256.514,338.264l-28.884,28.884l28.884,28.862l28.862-28.862L1256.514,338.264z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Hourly() {}
function Hour({ data }) {}

export default App;
