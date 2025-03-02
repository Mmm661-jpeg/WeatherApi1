import "./ForecastCompStyle.css"

function ForecastComp({forecastData})
{
    const genForecastItems = () =>
    {
        return forecastData.map((item,index)=> (
            
            <div className="forecast-item2" key={index}>
                <h3>{item.date}</h3>
                <img src={`http://openweathermap.org/img/wn/${item.medIcon}.png`} alt={item.date} />
                <p>{item.avmaxTemp} °C</p>
                <p>{item.avTemp} °C</p>
                <p>{item.avminTemp} °C</p>
            </div>
        ));
    }


    return(
        <>

        <div className="weather-bot">

            {genForecastItems()}

        </div>

        </>
    )
}

export default ForecastComp