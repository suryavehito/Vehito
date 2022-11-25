// import React, { useState } from "react";
// import { compose, withProps } from "recompose";
// import {
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
// } from "react-google-maps";
// import InfoWindow from "react-google-maps/lib/components/InfoWindow";
// import Typography from "@material-ui/core/Typography";
// import car from "../../assets/images/car.png";
// import { DirectionsService } from "@react-google-maps/api";
// import { DIRECTIONS_RENDERER } from "react-google-maps/lib/constants";
// import { getLocation } from "../../utils/getLocation";

// export const VehicleMap = compose(
//   withProps({
//     containerElement: <div style={{ minHeight: `100%` }} />,
//     mapElement: <div style={{ minHeight: `42.85rem` }} />,
//   }),
//   withGoogleMap
// )((props) => {
//   const [directions, setDirections] = useState();
//   const [errors, setErrors] = useState();
//   const [showInfo, setShowInfo] = useState();
//   const [selectedPoint, setSelectedPoint] = useState();
//   const [infoPosition, setInfoPosition] = useState();
//   const [location, setLocation] = useState("");

//   const onMarkerClick = () => {
//     setSelectedPoint(null);
//     getLocation(props?.lat, props?.lng).then((res) => setLocation(res));
//     setInfoPosition({ lat: props.lat, lng: props.lng });
//     setShowInfo(true);
//   };

//   const onRouteMarkerClick = (point) => () => {
//     setSelectedPoint(point);
//     setInfoPosition({ lat: point.lat, lng: point.lng });
//     getLocation(point.lat, point?.lng).then((res) => setLocation(res));
//     setShowInfo(true);
//   };

//   const getRoute = () => {
//     const waypoints = props.directions.map((p) => ({
//       location: { lat: p.lat, lng: p.lng },
//       stopover: false,
//     }));
//     const directionsService = new google.maps.DirectionsService();
//     console.log(waypoints);
//     directionsService.route(
//       {
//         origin: waypoints[0]?.location,
//         destination: waypoints[waypoints?.length - 1]?.location,
//         waypoints: waypoints,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           setErrors(result);
//         }
//       }
//     );
//     return (
//       <>
//         {props.directions && (
//           <>
//             <Marker
//               position={waypoints[0]?.location}
//               onClick={onRouteMarkerClick(waypoints[0]?.location)}
//             />
//             <Marker
//               position={waypoints[waypoints?.length - 1]?.location}
//               onClick={onRouteMarkerClick(
//                 waypoints[waypoints?.length - 1]?.location
//               )}
//             />
//             {props.directions.map(
//               (p, i) =>
//                 i !== 0 &&
//                 i !== waypoints?.length - 1 && (
//                   <Marker
//                     position={{ lat: p.lat, lng: p.lng }}
//                     onClick={onRouteMarkerClick(p)}
//                   />
//                 )
//             )}
//             {props.directions && (
//               <DirectionsRenderer
//                 directions={directions}
//                 options={{
//                   suppressInfoWindows: false,
//                 }}
//               />
//             )}
//           </>
//         )}
//       </>
//     );
//   };

//   const getSingleMarker = () => {
//     return props.isMarkerShown || props.isMarkerShown === undefined ? (
//       <Marker
//         onClick={onMarkerClick}
//         icon={{ url: car, labelOrigin: new window.google.maps.Point(15, 40) }}
//         label={{
//           text: props.vid !== "" ? props.vid : "Car",
//           fontWeight: "bold",
//         }}
//         position={{ lat: props.lat, lng: props.lng }}
//       />
//     ) : (
//       <></>
//     );
//   };
//   return (
//     <GoogleMap
//       ref={(map) => map && map.panTo({ lat: props.lat, lng: props.lng })}
//       defaultZoom={15}
//       defaultCenter={{ lat: props.lat, lng: props.lng }}
//     >
//       {props.isRoute ? getRoute() : getSingleMarker()}
//       {showInfo && (
//         <InfoWindow
//           onCloseClick={props.closeInfoWindow}
//           position={infoPosition}
//         >
//           {props.isRoute ? (
//             <div>
//               {props.status !== "" ? (
//                 <Typography variant="body2">Status: {props.status}</Typography>
//               ) : (
//                 ""
//               )}
//               <Typography variant="body2">Location: {location}</Typography>
//               {/* <Typography variant="body1">
//                 Speed: {selectedPoint.speed}
//               </Typography>

//               <Typography variant="body2">
//                 Main Battery: {selectedPoint.mainBattery}
//               </Typography>

//               <Typography variant="body2">
//                 Signal Strength: {selectedPoint.signalStrength} -
//               </Typography> */}
//             </div>
//           ) : (
//             <div>
//               {/* {props.vid !== "" ? (
//               <Typography variant="body1">VId: {props.vid}</Typography>
//             ) : (
//               ""
//             )} */}
//               {props.status !== "" ? (
//                 <Typography variant="body2">Status: {props.status}</Typography>
//               ) : (
//                 ""
//               )}
//               <Typography variant="body2">Location: {location}</Typography>
//             </div>
//           )}
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// });

import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { getLocation } from "../../utils/getLocation";

// const Map = (props) => {
//   const [waypoints, setWayPoints] = useState([]);

//   useEffect(() => {
//     setWayPoints(props?.waypoints);
//   }, [props?.waypoints]);

//   console.log(waypoints);

//   const [location, setLocation] = useState("");
//   const [showInfo, setShowInfo] = useState(false);
//   const [selectedPoint, setSelectedPoint] = useState();
//   const [infoPosition, setInfoPosition] = useState();
//   const [index, setIndex] = useState(-1);

//   const onMarkerClick = (lat, lng, i) => {
//     setSelectedPoint(null);
//     getLocation(lat, lng).then((res) => setLocation(res));
//     setInfoPosition({ lat: lat, lng: lng });
//     setShowInfo(true);
//     setIndex(i);
//   };

//   const closeInfoWindow = () => {
//     setShowInfo(false);
//     setInfoPosition("");
//   };

//   return waypoints.length >= 2 ? (
//     <GoogleMap
//       zoom={20}
//       center={{ lat: waypoints[0].lat, lng: waypoints[0].lng }}
//     >
//       {waypoints && (
//         <>
//           <Polyline path={waypoints} options={{ strokeColor: "#FF0000 " }} />
//           {waypoints.map((waypoint, i) => (
//             <Marker
//               onClick={() => onMarkerClick(waypoint.lat, waypoint.lng, i)}
//               key={`${waypoint?.lat}_${waypoint?.lng}_${i}`}
//               icon={{
//                 url:
//                   i === waypoints?.length - 1
//                     ? "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png"
//                     : i === 0
//                     ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg"
//                     : "",
//                 scaledSize: new window.google.maps.Size(20, 20),
//                 anchor: { x: 10, y: 10 },
//               }}
//               position={waypoint}
//             />
//           ))}
//         </>
//       )}
//       {showInfo && (
//         <InfoWindow onCloseClick={closeInfoWindow} position={infoPosition}>
//           <div>
//             {index !== -1 && props?.waypoints[index]?.signalStrength && (
//               <Typography variant="body2">
//                 Signal Strength: {props?.waypoints[index]?.signalStrength}
//               </Typography>
//             )}
//             <Typography variant="body2">Location: {location}</Typography>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   ) : (
//     <GoogleMap zoom={14} center={{ lat: 14.5, lng: 77.6 }}></GoogleMap>
//   );
// };

// const MapComponent = withGoogleMap(Map);

// export default function VehicleMap(props) {
//   console.log(props?.directions);
//   return (
//     <MapComponent
//       containerElement={<div style={{ minHeight: `100%`, width: "100%" }} />}
//       mapElement={<div style={{ minHeight: `42.85rem` }} />}
//       waypoints={props.directions}
//     />
//   );
// }

var map, marker;
const speed = 50; // km/h

const icon = {
  // url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
  scaledSize: new window.google.maps.Size(50, 50),
  anchor: { x: 10, y: 10 },
  offset: "5%",
  rotation: 90,
};

var delay = 100;

function animateMarker(marker, coords, km_h) {
  var target = 0;
  var km_h = km_h || 50;

  function goToPoint() {
    var lat = marker.position.lat();
    var lng = marker.position.lng();
    var step = (km_h * 1000 * delay) / 3600000; // in meters

    var dest = new window.google.maps.LatLng(
      coords[target][0],
      coords[target][1]
    );

    var distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      dest,
      marker.position
    );

    var numStep = distance / step;
    var i = 0;
    var deltaLat = (coords[target][0] - lat) / numStep;
    var deltaLng = (coords[target][1] - lng) / numStep;

    function moveMarker() {
      lat += deltaLat;
      lng += deltaLng;
      i += step;
      if (i < distance) {
        marker.setPosition(new window.google.maps.LatLng(lat, lng));
        let lastPosn = marker.getPosition();
        let heading = window.google.maps.geometry.spherical.computeHeading(
          lastPosn,
          dest
        );
        icon.rotation = heading;
        marker.setIcon(icon);
        map.setCenter(marker.getPosition());
        setTimeout(moveMarker, delay);
      } else {
        marker.setPosition(dest);
        target++;
        if (target == coords.length) {
          target = 5;
        }
        setTimeout(goToPoint, delay);
      }
    }
    moveMarker();
  }
  goToPoint();
}

function initialize(directions, vehicle) {
  if (directions.length > 0) {
    var myOptions = {
      zoom: 20,
      center: new window.google.maps.LatLng(directions[0][0], directions[0][1]),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      navigationControl: true,
      navigationControlOptions: {
        style: window.google.maps.NavigationControlStyle.SMALL,
      },
    };
    map = new window.google.maps.Map(
      document.getElementById("map_canvas"),
      myOptions
    );

    marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(
        directions[0][0],
        directions[0][1]
      ),
      map: map,
      icon: icon,
    });

    window.google.maps.event.addListenerOnce(map, "idle", function () {
      if (vehicle?.status === "M") {
        animateMarker(marker, directions, speed);
      }
    });
  } else {
    var myOptions = {
      zoom: 20,
      center: new window.google.maps.LatLng(
        22.293147151391796,
        73.16025681813052
      ),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };
    map = new window.google.maps.Map(
      document.getElementById("map_canvas"),
      myOptions
    );
    marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(
        22.293147151391796,
        73.16025681813052
      ),
      map: map,
    });
  }
}

export default function VehicleMap(props) {
  useEffect(() => {
    initialize(props?.directions, props?.vehicleDetails);
  }, [props.directions]);

  return (
    <div style={{ width: "100%", minHeight: "42.85rem" }} id="map_canvas"></div>
  );
}
