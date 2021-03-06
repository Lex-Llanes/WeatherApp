import { React, useState, useEffect } from 'react'

const WeatherList = () => {

    /*Variables for user data and favorite city*/
    const [user, setUser] = useState([
        {
            user_id: 0,
            first_name: "",
            last_name: ""
        }
    ])
    const [favCity, setFav] = useState("")

    /*Variables for weather data*/
    const [userCity, setUserCity] = useState("")
    const [weatherDetails, setDetails] = useState([]);
    const [weatherCity, setWeatherCity] = useState("");
    const [weatherCloud, setClouds] = useState("");
    const [weatherTemp, setTemp] = useState("");
    const [weatherWind, setWind] = useState("");
    const [weatherHumid, setHumid] = useState("");


    //GET ALL USERS
    async function getUser(){
        try {
            const response = await fetch("http://localhost:8080/user");
            const userList = await response.json()

            setUser(userList)
        } catch (error) {
            console.error(error.message)
        }
    }
    /*useEffect to constactly call the function to get all users*/
    useEffect(() => {
        getUser()
    }, [])


    //TO ADD FAVORITE CITY
    const addCityToFav = async (event) => {

        console.log(favCity)
        console.log(user[0].user_id)

        //setFav(userCity)
        try {
            const body = { favCity };
            const response = await fetch(`http://localhost:8080/user/${user[0].user_id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
        } catch (err) {
            console.error(err.message)
        }

    }


    //HANDLES THE CITY INPUT TO DETERMINE WHAT CITY TO PULL WEATHER DATA FROM
    const handleWeatherInputs = async (event) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:8080/weather/${userCity}`)
        const data = await response.json()

        setWeatherCity(data.city.name)
        setClouds(data.list[0].weather[0].description)
        setTemp(data.list[0].main.temp)
        setWind(data.list[0].wind.speed)
        setHumid(data.list[0].main.humidity)
        setFav(data.city.name)
    }

    console.log(user);

  return (
    <div>
        <form onSubmit={handleWeatherInputs}>
        <br/>
        <br/>
        <br/>
            <label className="searchheader">Enter City For Weather</label>
            <br/>
            <input 
                type="text"
                placeholder="Enter City"
                value={userCity}
                onChange={(event) => setUserCity(event.target.value)}
            />
            <br/>

            <button data-label="Search"
                type="submit"
                value="Submit"
            />
        </form>

        <br/>
        <br/>
        <br/>

        <div>
            <span className="placeholders">User: </span> <span className="datas">{user[0].first_name} {user[0].last_name}</span>
            <br/>
            <span className="placeholders">Favorite City: </span> <span className="datas"> {user[0].favorite_city}</span>
            <br/>
        <button data-label="Add Favorite City" onClick={addCityToFav} className="button-51">Add Favorite City</button>
        </div>

        <br/>
        <br/>
        <br/>


        <div className="card">
            <span className="placeholders">City Name: </span> <span className="datas">{weatherCity}</span>
            <br/>
            <span className="placeholders">Skies: </span> <span className="datas"> {weatherCloud} </span>
            <br/>
            <span className="placeholders">Temperature: </span> <span className="datas"> {weatherTemp}^F</span>
            <br/>
            <span className="placeholders">Wind: </span> <span className="datas"> {weatherWind}mph</span>
            <br/>
            <span className="placeholders">Humidity: </span> <span className="datas"> {weatherHumid}</span>
            <br/>
        </div>

    </div>
  )
}



export default WeatherList;