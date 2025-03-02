const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const WeatherCurrent = async (city) =>
{
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

    let data = await fetch(url).then(response => response.json()).catch(er => {console.error(er);return null})
    if(data)
    {
        let result = 
        {   city:data.name,
            temp: data.main.temp,
            des:data.weather[0].description,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            icon: data.weather[0].icon
        }
        console.log("Api call succesfull")
        console.log(result)


        return result;
    }
    else
    {
        console.log("Data not read something wrong with response")
    }

}

export const WeatherForecast = async (city) =>
{
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

    let data = await fetch(url)
    .then(response=>response.json())
    .catch(er=>{console.log(er);return null})

    if(!data)
    {
        console.error("No Data in response?")
        return null;
    }


    try
        {
            const cityName = data.city.name


            //IconID,Temp, max, temp min, temp avrage

            const dailyData = {};

            data.list.forEach(element => {

                let theDate = element.dt_txt.split(" ")[0]

                if(!dailyData[theDate])
                {
                    dailyData[theDate] = {
                        temp: [],
                        maxtemp: [],
                        mintemp: [],
                        iconid: []
                    }

                }

                dailyData[theDate].temp.push(element.main.temp);
                dailyData[theDate].maxtemp.push(element.main.temp_max);
                dailyData[theDate].mintemp.push(element.main.feels_like); //Really its temp_min but feels_like generate lower number sometimes
                dailyData[theDate].iconid.push(element.weather[0].icon)
                
            });


            const getIconID = (arrayOfIcons) =>
            {
                let theIcon;

                if(arrayOfIcons.length %2 === 1)
                {
                    theIcon = arrayOfIcons[Math.floor(arrayOfIcons.length / 2)]
                }
                else
                {
                    theIcon = arrayOfIcons[(arrayOfIcons.length / 2) - 1]
                }

                return theIcon;
            }


            const result = Object.entries(dailyData).map(([key,value]) => ({

                date:key,
                avTemp: Number((value.temp.reduce((a,b) => a+b) / value.temp.length).toFixed(2)) ,
                avmaxTemp: Number((value.maxtemp.reduce((a,b) => a+b) / value.maxtemp.length).toFixed(3)) ,
                avminTemp: Number((value.mintemp.reduce((a,b) => a+b) / value.mintemp.length).toFixed(3)) ,

                medIcon: getIconID(value.iconid)

            })).sort((a,b)=> new Date(a.date) - new Date(b.date));

            console.log(result)
            return result;
    }

    catch(er)
    {
        console.error(er);
        return null;
    }


}


export const CurrentWeatherWithIP = async () =>
{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

    let data = await fetch(url).then(response => response.json()).catch(er => {console.error(er);return null})

    console.log(data.location.name) //Ip dåligt använd annan api för ip sök.

    //current och forecast ska kallas med denna använd  bara geolocaion sen
    // kallas denna i main med stad/koordinat


}

