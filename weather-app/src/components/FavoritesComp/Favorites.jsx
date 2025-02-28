import { useState } from "react";



function Favorites({myFav,setMyFavs,setClickedCity,clickedCity})
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

                setMyFavs([...myFav , lastCity]);
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

                setMyFavs(updatedFavs);
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

        <header> 

        <nav>
            <ul>
                {GenerateList()}
            </ul>  
        </nav>

        <button className="Fav-btn" onClick={AddFav}>Add</button>
        <button className="Fav-btn" onClick={RemoveFav}>Remove</button>

    </header>

    )
}

export default Favorites