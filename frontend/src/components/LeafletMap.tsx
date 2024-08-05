// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useStore } from "../hooks/useStore";

interface Location {
  lat: number;
  lon: number;
  display_name: string;
}
// interface LeafletMapProps{
//     data:Location[]
// }
const LeafletMap: React.FC=()=>{
  const [city, setCity] = useState<string>("");
  const [loc, setLoc] = useState<Location[]>([]);
  console.log(loc);
  const {rootStore:{employeeDetailsStore}}=useStore()

  // useEffect(()=>{
  //   const loc:Location[]=employeeDetailsStore.getAllEmployeesLocation;
  //   setLoc(loc)
  // },[])


//   function handleClick() {
//     (async () => {
//       const res = await fetch(
//         `https://geocode.maps.co/search?q=${city}&api_key=66279a352b278277352341fzc67278a`
//       );
//       const data = await res.json();
//       setLoc((p) => [
//         ...p,
//         {
//           lat: Number(data[0].lat),
//           lon: Number(data[0].lon),
//           display_name: data[0].display_name,
//         },
//       ]);
//     })();
//   }

  return (
    <>
      {/* <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleClick}>Click</button> */}
      <MapContainer
        center={[29.67582038643528, 76.99171840073781]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "40vh", width: "80" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {employeeDetailsStore.employeeDetails.map((p, ind) => (
          <Marker key={ind} position={[p.location.lat, p.location.lon]}>
            <Popup>
              <div className="">
                <h4>{p?.location?.display_name}</h4>
               <div className="">
                <p className="font-bold">Employee Details</p>
               <p> id:{p._id}</p>
                <p> Name:{p.name}</p>
               </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </>
  );
}

export default LeafletMap;
