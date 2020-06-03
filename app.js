const request= require('request')
const express= require('express')
const path= require('path')
const hbs = require('hbs')

const app=express()
const getWeather= (location,callback)=>{

    const URL="http://api.weatherstack.com/current?access_key=5426a63b16c3b81165fef0084bafd0e1&query="+location
    request({ url: URL,json: true},(error,response,body)=>{

        if (body.current===undefined) {
            callback('Unable to find location. Try another search.', undefined)}
    else
    {
    callback({
       weather_desc: body.current.weather_descriptions,
       currentTemp: body.current.temperature,
       currentHumidity: body.current.humidity

    })
    }

})}


const pathName=path.join(__dirname,'./src')
const patialsPathName=path.join(__dirname,'./src/partials')
hbs.registerPartials(patialsPathName)
app.use(express.static(pathName))
app.listen('3000')
app.set('view engine','hbs')
app.set('views',pathName)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'this is  BOUT page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location)
    {
        return res.send('please enter the location')
    }

    const location=req.query.location
    getWeather(location,(data) => {
    
        return res.send(data)
    })
})


