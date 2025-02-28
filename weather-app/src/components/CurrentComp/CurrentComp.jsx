import "./CurrentCompStyle.css"

function CurrentComp({currentData})
{
    return(
        <>

                <div className="weather-mid">
                    <h1>{currentData.temp} °C</h1>
                    <h2>{currentData.city}</h2>
                    <h2>{currentData.des}</h2>

                    <div className="weather-mid-details">
                    <p>{currentData.wind} km/h</p>
                    <p>wind image</p>

                    <p>{currentData.humidity}%</p>
                    <p>hum image</p>
                    </div>

                </div>
        </>
    )
}

export default CurrentComp