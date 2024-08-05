import { Location } from "../models/employee.models";
export async function getLatLog(city:string):Promise<Location>{
    try {
        const res=await fetch(`https://geocode.maps.co/search?q=${city}&api_key=66279a352b278277352341fzc67278a`);
    const loc=await res.json();
    const {lat,lon,display_name}=loc[0];
    const offset=0.01;
    if(lat!==undefined && lon!==undefined) {
        let latOffset=0;
        let longOffset=0
         latOffset=Math.random()*offset-offset/2
         longOffset=Math.random()*offset-offset/2
        const newLat= Number(lat) + latOffset
        const newLong= Number(lon) + longOffset
        return {
            lat:Number(newLat),
            lon:Number(newLong),
            display_name:display_name
        }
    }
    else{
        throw new Error("latitude and Longitude are missing")
    }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// const latOffset = Math.random() * offset - offset / 2;
//     const lngOffset = Math.random() * offset - offset / 2;
//     const newLat = p.location.lat + latOffset;
//     const newLng = p.location.lon + lngOffset;