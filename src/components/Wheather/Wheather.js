import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherData from "./WeatherData";
import bg1 from "../../assets/wheather/sample.jpg";

const Wheather = () => {
  //search button
  const [search, setSearch] = useState(false);

  //search wheather
  const [searchWheather, setSearchWheather] = useState("Mumbai");

  //store the entered data
  const [selectedWheather, setNewWheather] = useState({});

  //store errors
  const [errors, setErrors] = useState("")

  //Open side dock
  const openDock = () => {
    if (search) {
      console.log("close");
      setSearch(!search);
    } else {
      console.log("open");
      setSearch(!search);
    }
  };

  //Get wheather details
  const getWheather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchWheather}&units=metric&appid=USEYOURAPI`;
      let wheatherData = await fetch(url);
      let data = await wheatherData.json();
      console.log(data)
      if(data.cod == 404){
        setErrors(data.message)
      }else{
        const { main: wheatherMood } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { all: clouds } = data.clouds;
        const { country, sunrise, sunset } = data.sys;
        const { name: countryName } = data;
        const { speed } = data.wind

        const whatherDetails = {
          wheatherMood,
          temp,
          humidity,
          pressure,
          clouds,
          country,
          sunrise,
          sunset,
          countryName,
          speed
        };

        // console.log(whatherDetails);
        setSearch(false);
        setErrors('');
        setNewWheather(whatherDetails);
      }      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "Wheather App"
    getWheather();
  }, []);

  let bg = {backgroundImage: `url("${bg1}")`};

  return (
    <div className="wheather-bg" style={bg}>
      <div className="navigation">
        <div className="logo">
          <i className={"wi wi-alien"}></i>
        </div>
        <div className="search">
          {search ? null : (
            <i className="fas fa-search fa-2x " onClick={() => openDock()}></i>
          )}
        </div>
      </div>
      {/* spread all data and destructure all selectedWheather data now it is showing as 
        wheatherMood,
        temp,
        humidity etc */}
      <WeatherData {... selectedWheather} />
      <div className={`${search ? "side-dock" : "side-dock-hidden"}`}>
        <div className="close-btn">
          <i className="fas fa fa-times fa-2x" onClick={() => openDock()}></i>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-field"
            placeholder="Enter city name or pincode"
            autoFocus
            value={searchWheather}
            onChange={(e) => setSearchWheather(e.target.value)}
          />
          <i
            className="fas fa fa-angle-right fa-2x"
            onClick={() => getWheather()}
          ></i>
        </div>
        {errors === '' ?  null : 
        <div className="search-data">
          <ul>
            <li>{errors}</li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Wheather;
