import React, { useState, useEffect } from "react";

const WeatherData = ({
  wheatherMood,
  temp,
  humidity,
  pressure,
  clouds,
  country,
  sunrise,
  sunset,
  countryName,
  speed,
}) => {
  const [wheatherMoodData, setWheatherMoodData] = useState("");

  useEffect(() => {
    if (wheatherMood) {
      switch (wheatherMood) {
        case "Clouds":
          setWheatherMoodData("wi-day-cloudy");
          break;
        case "Haze":
          setWheatherMoodData("wi-day-haze");
          break;
        case "Mist":
          setWheatherMoodData("wi-day-fog");
          break;
        case "Rain":
          setWheatherMoodData("wi-day-showers");
          break;
        case "Clear":
          setWheatherMoodData("wi-day-sunny");
          break;
        default:
          setWheatherMoodData("wi-day-sunny");
          break;
      }
    }
  }, [wheatherMood]);

  let sunsetDate = sunset;
  let sdate = new Date(sunsetDate * 1000);
  let timeStr = `${sdate.getHours()} : ${sdate.getMinutes()}`;

  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <>
      <div className="wheather-details text-white">
        <div className="degree">
          <h3>{parseInt(temp)}&deg;c</h3>
        </div>
        <div className="location-details text-white">
          <h4>
            {countryName} <span className="initial">,{country}</span>
          </h4>

          <p>
            {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${
              weeks[date.getDay()]
            }, ${date.getDate()} ${
              months[date.getMonth()]
            } ${date.getFullYear()}`}{" "}
            - <span>{wheatherMood}</span>
          </p>
        </div>
        <div className="wheather-icon">
          <i className={`wi ${wheatherMoodData}`}></i>
        </div>
      </div>
      <div className="weather-seaction-details">
        <div className="colm-3">
          <i className={"wi wi-sunset"}></i>
          <span className="weather-section-data fw-b">Sunset</span>
          <p className="weather-section-data">{timeStr}</p>
        </div>
        <div className="colm-3">
          <i className={"wi wi-humidity"}></i>
          <span className="weather-section-data fw-b">Humidity</span>
          <p className="weather-section-data">{humidity}</p>
        </div>
        <div className="colm-3">
          <i className={"wi wi-barometer"}></i>
          <span className="weather-section-data fw-b">Pressure</span>
          <p className="weather-section-data">{pressure}</p>
        </div>
        <div className="colm-3">
          <i className={"wi wi-sandstorm"}></i>
          <span className="weather-section-data fw-b">Speed</span>
          <p className="weather-section-data">{speed}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherData;
