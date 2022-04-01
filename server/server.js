const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});


//SIMPLE ROUTE TO LIST OUT 5 DAY WEATHER OF A CITY *the :city is our req.params*
app.get('/weather/:city', async (req, res) => {
    try {
        //We are declaring a city equaling our params and adding it to our fetch url hence the ${city} in the fetch url
        const { city } = req.params;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9b387bf16727c13abb92fc265ba3710c&units=imperial`)
        const body = await response.json()

        return res.send(body)
    } catch (error) {
        console.error(error.message)
    }
})


//GET ALL USER DATA
app.get('/user', async (req, res) => {
    try {
        const allUsers = await db.query('SELECT * FROM weatheruser');

        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})


//UPDATES FAVORITE CITY
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { favCity } = req.body;

        const updateFav = await db.query('UPDATE weatheruser SET favorite_city = $1 WHERE user_id = $2', [favCity, id])
    } catch (error) {
        console.error(error.message)
    }
})


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});