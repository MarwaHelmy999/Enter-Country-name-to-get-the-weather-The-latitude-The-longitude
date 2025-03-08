let form = document.getElementById("form1")
let inp = document.getElementById("address")
let errorF = document.getElementById("error")
let locationF = document.getElementById("location")
let forecastF = document.getElementById("forecast")
let latitudeF = document.getElementById("latitude")
let longitudeF = document.getElementById("longitude")


form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    console.log(inp.value)
    weatherFunction()
    form.reset()
})

let weatherFunction = async()=>{
    try{
        const inp = document.getElementById("address").value
        const res = await fetch('http://localhost:3000/weather?address='+inp ) //json
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
            latitudeF.innerText =""
            longitudeF.innerText =""
        }
        else{
            locationF.innerText = "The Country is " + data.location
            forecastF.innerText = data.forecast
            latitudeF.innerText = "The latitude = " + data.latitude
            longitudeF.innerText = "The longitude = " + data.longitude
            errorF.innerText = ""
        }
    }
    catch(e){
        console.log(e)
    }
}