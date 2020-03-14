window.addEventListener('load', ()=>{

let long;
let lat;
let tempDesc = document.querySelector('.temp-description');
let tempDegree = document.querySelector('.temp-degree');
let locationZone = document.querySelector('.location-timezone');
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/d64854258f564a0e651c6d14fd2bbdfa/${lat},${long}` ; 
        const api2 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1` 
    
        console.log(api);

        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
           
            const {temperature, summary, icon} = data.currently;
            tempDegree.textContent = Math.floor(temperature);
            tempDesc.textContent = summary;
            

            setIcon(icon,document.querySelector('.icon'))
        })


        fetch(api2)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            const {city, neighbourhood} = data.address
            locationZone.textContent = neighbourhood + ", " + city;
            console.log(data.address);
            
    
        })

    });


}else{
    h1.textContent = "no"
}

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});