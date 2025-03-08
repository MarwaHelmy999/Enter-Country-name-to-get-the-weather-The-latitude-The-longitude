const request = require("request")

const forecast = (longitude ,latitude  , callback) =>{
    console.log("Latitude:", latitude, "Longitude:", longitude); 
    const url = "https://api.weatherapi.com/v1/current.json?key=644604d4de0f455abad200605252002&q="+ latitude + "," + longitude  
    request({url , json: true } ,(error, response)=>{
        if (error){
            callback("unabel to connect Api service" , undefined) // low level error
        }else if(response.body.error){
            callback(response.body.error.message , undefined)
        }else{
            callback(undefined , " the Current weather: "+ response.body.current.condition.text + " , the temperature: " + 
                response.body.current.temp_c 
            )
        }
    })
}
module.exports= forecast

