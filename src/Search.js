import axios from 'axios';
import React, { useState } from 'react';
import './mySearch.css'
// import { Button } from 'react-bootstrap'
// import { index } from '@babel/types' 
const Search = (props) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    


    const getWeatherData = async (city, country) => {
        console.log(city, country);
        await axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country},&appid=f4b372960c5401bff12c77e94d4a943a`
        }).then((res) => {
            console.log(res.data);
            
            setMin(res.data.main.temp - min - 273.15);
            setMax(res.data.main.temp - max - 273.15);
            setCountry(res.data.sys.country);
            
            sendData(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    function sendData(res) {
        props.sendData(res);
    }

    return (

        <div className="col-6 app-bg d-flex flex-wrap py-3">
            <div className="col-12">
                <h2 className="text-white m-0">Your Location is block please allow location</h2>
            </div>

            <div
                className="CityName">
                <input type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="cityname"   />

            </div>
            <div
                className="CountryName">
                <input type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="countryCode"  />
            </div>

            <div>
                <button onClick={(e) => getWeatherData(city, country)}
                    className="searchButton"> Get Weather</button>
            </div>
        </div>


    )
}

export default Search
