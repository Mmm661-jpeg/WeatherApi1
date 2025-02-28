import { WeatherCurrent } from './service/Weatherservice'




function CurrentComp()
{
    return(
        <>

                <div className="weather-mid">
                    <h2> 0° </h2>
                    <h2>Cityname</h2>

                    <div className="weather-mid-details">
                    <p>wind</p>
                    <p>wind image</p>

                    <p>humidity</p>
                    <p>hum image</p>
                    </div>

                </div>
        </>
    )
}

export default CurrentComp