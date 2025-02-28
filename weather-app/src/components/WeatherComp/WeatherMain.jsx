import { useEffect, useRef, useState } from "react"

import "./WeatherMain.css"

import { WeatherCurrent } from './service/Weatherservice'
import { WeatherForecast } from './service/Weatherservic'

import CurrentComp from "./CurrentComp"
import ForecastComp from "./ForecastComp"
import Favorites from "../FavoritesComp/Favorites"



function WeatherMain()
{
    

    const [cityValue,setCityValue] = useState("");
    const [currentData,setCurrentdata] = useState(null)
    const [forecastData,setForeCastdata] = useState(null)
    const [myFav,setMyfavs] = useState(localStorage.getItem("fav") || [])


    useEffect(() =>
    {
        const InitialGetWeather = async () =>
        {
            try
            {
                let result1 = await WeatherCurrent("Stockholm");
                let result2 = await WeatherForecast("Stockholm");

                if(result1 && result2)
                {
                    setCurrentdata(result1);
                    setForeCastdata(result2);
                }

            }
            catch(er)
            {
                console.error("Error handling initial request when page mounts:",er)
            }
           


        }

        InitialGetWeather();
       
       

    },[])

    const HandleSearch = async () =>
    {
       try
       {
            if(!cityValue)
            {
                alert("Enter city to search!");
                return;
            }

            let result = await WeatherCurrent(cityValue);
            let result2 = await WeatherForecast(cityValue)

            if(result && result)
            {
                setCurrentdata(result);
                setForeCastdata(result2);
            }
            else
            {
                console.error("Data not recieved from request(Search).");
            }
       }
       catch(er)
       {
            console.log("Error " + er);
       }

    }

    

        return(
        <>
            <div className="weather-con">


                <Favorites myFav={myFav} setNewFav={setMyfavs}/>

                <div className="weather-top">

                    <input type="text" placeholder="city.." value={cityValue} onChange={(e) =>setCityValue(e.target.value)}/> 
                    <button onClick={HandleSearch}>Search</button>

                </div>

                {
                    !currentData && !forecastData ? (
                        <>

                        <div className="weather-mid">

                        <h2> Loading...</h2>
                        <h2>{cityValue}</h2>

                        </div>

                        <div className="weather-bot">

                        <p>Loading...</p>

                            
                        </div>

                        </>



 
                    ) 
                    : 
                    (   <> 
                        <CurrentComp currentData = {currentData} />

                        <ForecastComp forecastData={forecastData} />
                               
                        </> 

                    )
                }

               

            </div>
        </>
    )

}

export default WeatherMain