const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render('index');
})

app.post("/", function(req, res){
    const apiKey="396fd76d3b24fd85b3cd61bdd95d291a";
    const unit = "metric";
    const city = req.body.cityInput;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;

    
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherInfo= JSON.parse(data);
            const t=weatherInfo.main.temp
            const d=weatherInfo.weather[0].description;
            const f=weatherInfo.main.feels_like;
            const maxTemp = weatherInfo.main.temp_max;
            const minTemp = weatherInfo.main.temp_min;
            
            res.render('result', {city:weatherInfo.name, t:t, d:d, f:f, maxTemp:maxTemp, minTemp:minTemp});
        })
    })
})


app.listen(process.env.PORT || 5000)