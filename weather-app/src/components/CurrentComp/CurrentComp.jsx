import "./CurrentCompStyle.css"
import windicon from "../../assets/wind-icon.jpg"
import humidityicon from "../../assets/humidity-icon.jpg"
function CurrentComp({currentData})
{
    return(
        <>

                <div className="weather-mid">
                    <h1>{currentData.temp}°C</h1>
                    <img src={`http://openweathermap.org/img/wn/${currentData.icon}.png`} alt={currentData.icon} />
                    <h2>{currentData.city}</h2>

                    <div className="weather-mid-details">
                    
                    <div className="detail-col">
                    <p>Windspeed:</p>
                    <p>{currentData.wind} km/h</p>
                    <img src={windicon} alt="wind" />
                    </div>

                    <div className="details-col">
                    <h2 className="desc-h2">{currentData.des}</h2>
                    </div>

                    <div className="detail-col">
                        <p>Humidity:</p>
                    <p>{currentData.humidity}%</p>
                    <img src={humidityicon} alt="humidity" />
                    </div>
                    

                    </div>

                </div>
        </>
    )
}

export default CurrentComp