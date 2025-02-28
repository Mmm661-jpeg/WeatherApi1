import "./Favorites.css"

//Maybe problem?: when no new searches have been made it saves the last search can be good and bad.

function Favorites({myFav,setMyfavs,setClickedCity,clickedCity})
{
   

    const AddFav = () =>
    {
        let theCities = JSON.parse(sessionStorage.getItem("Cities")) || [];

        if(theCities.length > 0)
        {
            let lastCity = theCities[theCities.length -1 ]

            if(!myFav.includes(lastCity))
            {
                localStorage.setItem("Fav",JSON.stringify([...myFav,lastCity]));

                setMyfavs([...myFav , lastCity]);
            }

           
        }


       
    }

    const RemoveFav = () =>
    {
        
       if(clickedCity)
       {
            let thefavs = JSON.parse(localStorage.getItem("Fav")) || [];

            if(thefavs.length === 0) {console.error("Found no cities to remove in LS"); return;} 

            let updatedFavs = thefavs.filter(city => city !== clickedCity);

            if(updatedFavs.length !== thefavs.length)
            {
                localStorage.setItem("Fav",JSON.stringify(updatedFavs));

                setMyfavs(updatedFavs);
            }

            setClickedCity(null);
       }
    }

    const GenerateList = () =>
    {
        if(myFav.length > 0)
        {
            return myFav.map((city,index) => (

                <li key={index} onClick={()=>setClickedCity(city)} >{city}</li>
            ))
        }

        return null;
    }

    return(

        <header className="Fav-head"> 

        <nav className="Fav-nav">
            <ul className="Fav-ul">
                {GenerateList()}
            </ul>  
        </nav>

        <div className="Fav-end">
            <h3>Save to favorites?</h3>
           <div>
           <button className="Fav-btn" onClick={AddFav}>+</button> 
           <button className="Fav-btn" onClick={RemoveFav}>-</button>
           </div>
        </div>
        

    </header>

    )
}

export default Favorites