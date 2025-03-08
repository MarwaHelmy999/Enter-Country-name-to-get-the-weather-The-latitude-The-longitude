const request = require("request")
const geocode = (address , callback)=>{
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"
    request({url: geocodeUrl , json:true} , (error , response) =>{
        if(error){ // in case low level
            callback("Un able to connect geocode" , undefined)
        }else if(response.body.message){
            callback(response.body.message , undefined)// in case there is error in the token
        }else if(response.body.features.length == 0){ // in case problem in country name
            callback("unable to find the location" , undefined)
        }else{ // in case all is right
            callback(undefined , {
                 longitude  : response.body.features[0].center[0] ,
                 latitude : response.body.features[0].center[1] 
            })
        }
    })
}
module.exports = geocode
