const express = require("express")
const app = express()
const port = process.env.PORT || 3000

// app.get("/prices" , (request , response)=> {
//     response.send("prices page")
// })
// app.get("/page2" , (request , response)=> {
//     response.send({
//         age: 25,
//         name: "Marwa"
//     })
// }) 
// app.get("/" , (request , response)=> {
//     response.send("hello home page")
// }) 
const path = require("path")
const { title } = require("process")
const x =  path.join(__dirname , "../public")

console.log(x)
app.use(express.static(x))
app.set('view engine', 'hbs') 
var hbs = require('hbs')
const partialspath = path.join(__dirname , "../temp1/partials")
hbs.registerPartials(partialspath)


const viewDirectory = path.join(__dirname , "../temp1/views")
app.set("views" ,viewDirectory )
app.get('/' , (req , res)=>{
    res.render('index' , {
        title: "Home",
        desc: "this is home page"
    })
})
app.get('/service' , (req , res)=>{
    res.render('service' , {
        // title: "service",
        name: "marwa",
        city: "cairo",
        age: "25",
        image: "images/t_shirt.png"

    })
})

app.get('/team' , (req , res)=>{
    res.render('team' , {
        title: "team",
        name: "marwa",
        city: "cairo",
        age: "25",
        image: "images/t_shirt.png"

    })
})
app.get('/product' , (req , res)=>{
    console.log(req.query)
    res.send({
        product: "BMW 520"

    })
})

// app.get('/weather' , (req , res)=>{
//     if(!req.query.address){
//         return res.send({
//             error: "you must provide an address",

//         })
//     }
//     console.log(req.query.address)
//     res.send({
//         location : req.query.address,
//         Forecast: "Cold"


//     })
// })


const geocode = require("./data/geocode")
const forecast= require("./data/forcast")

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide an address",
        })
    }
    geocode(req.query.address , (error , data)=>{
        if(error){
            return res.send({error})
        }
        console.log(data.latitude, data.longitude)
        forecast(data.latitude , data.longitude  , (error , forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData , 
                location: req.query.address, 
                latitude: data.latitude,
                longitude: data.longitude
            })
        })
    })
    })
app.get( "*" , (req , res)=>{
    res.send("404 page not found")
})

app.listen(port , () =>{
    console.log("app is listening in port 3000")
})