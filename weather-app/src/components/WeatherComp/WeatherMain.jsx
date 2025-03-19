import { useEffect, useState } from "react"

import searchicon from "../../assets/icons8-search-50.png"

import "./WeatherMain.css"

import { WeatherCurrent } from '../../service/Weatherservice'
import { WeatherForecast } from '../../service/Weatherservice'
import { CurrentWeatherWithIP } from "../../service/Weatherservice"

import Favorites from "../FavoritesComp/Favorites"
import ForecastComp from "../ForecastComp/ForecastComp"
import CurrentComp from "../CurrentComp/CurrentComp"



function WeatherMain()
{
    

    const [cityValue,setCityValue] = useState("");
    const [currentData,setCurrentdata] = useState(null)
    const [forecastData,setForeCastdata] = useState(null)

    const [myFav,setMyfavs] = useState(JSON.parse(localStorage.getItem("Fav")) || [])

    const [clickedCity,setClickedCity] = useState(null); //Kan köra useeffekt som söker if !null

    const [userLocation,setUserLocation] = useState({Lat:null,Lon:null});

    const [loadingIP,setLoadingIP] = useState(true);



    useEffect(()=>
    {
       if("geolocation" in navigator)
       {
        navigator.geolocation.getCurrentPosition((response) =>{

            setUserLocation({Lat:response.coords.latitude,Lon:response.coords.longitude})
           })
       }
       else
       {
        console.error("Geolocation not supported by browser.")
       }
        
    },[])


    useEffect(() =>
    {
        
        if (!userLocation.Lat || !userLocation.Lon) return;

        const locationWeatherSearch = async () =>
        {
           try
           {
                let result = await CurrentWeatherWithIP(userLocation)

                if(result)
                {
                    let result2 = await WeatherForecast(result.city)
                    if(result2)
                    {
                        //ssetLoadingIP(true);
                        setCurrentdata(result);
                        setForeCastdata(result2);
                    }
                    else
                    {
                        setLoadingIP(false);
                    }
                }
                else
                {
                    setLoadingIP(false);
                }
           }
           catch(er)
           {
            console.error(er);
           }
          
        }

        locationWeatherSearch();

    },[userLocation,loadingIP])





    //Local storage saves only the set favorites not alöl citites

    useEffect(()=>
    {
        if(clickedCity)
        {
            setCityValue(clickedCity);
            //Sök utan klick

        }

       

    },[clickedCity])

   

        


    useEffect(() =>
    {
        if (!loadingIP||!userLocation.Lat || !userLocation.Lon) return;


        const InitialGetWeather = async () =>
        {
            try
            {
                let result1 = await WeatherCurrent("Paris");
                let result2 = await WeatherForecast("Paris");

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
       
       

    },[loadingIP])

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



                //Every search save all cities

                let theCities = new Set(JSON.parse(sessionStorage.getItem("Cities")) ||[]); //make into set
                theCities.add(cityValue); //Add to set makes sure its unique

                sessionStorage.setItem("Cities",JSON.stringify([...theCities])); //then take set make it into array and add back dont overwrite
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


        <div className="container"> 

       


        <Favorites myFav={myFav} setMyfavs={setMyfavs} setClickedCity={setClickedCity} clickedCity={clickedCity}/>
            
          

         

            <div className="weather-con">


                

                <div className="weather-top">

                    <input type="text" placeholder="city.." value={cityValue} onChange={(e) =>setCityValue(e.target.value)}/> 
                    <button onClick={HandleSearch}><img src={searchicon} alt="icon8.com" /></button>

                </div>

                {
                    !currentData && !forecastData ? (
                        <>

                        <div className="weather-mid-fail">

                        <h2> Loading...</h2>
                        <h2>{cityValue}</h2>

                        </div>

                        <div className="weather-bot-fail">

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


            </div>

            
        </>
    )

}

export default WeatherMain