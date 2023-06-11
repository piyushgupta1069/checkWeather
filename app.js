const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
  // res.send("Server is up and running");
});
app.post("/",function(req,res){
  const query = req.body.CityName;
  const apiKey = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+apiKey+""
  https.get(url, function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" +icon+ "@2x.png"
      res.write("<p>The weather is currently "+description+"<p>")
      res.write("<h1>temperature is "+temp+" degree</h1>")
      res.write("<img src=" +imageURL+" >")
      res.send()
    });
  });
})
app.listen(3000,function(){
  console.log("running on 3000");
});
