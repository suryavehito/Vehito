import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { getLocation } from "../../utils/getLocation";

const Map = (props) => {
  const [waypoints, setWayPoints] = useState(
    props.waypoints.map((wp) => {
      return {
        lat: wp.latitude,
        lng: wp.longitude,
      };
    })
  );

  const [location, setLocation] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState();
  const [infoPosition, setInfoPosition] = useState();
  const [index, setIndex] = useState(-1);

  const onMarkerClick = (lat, lng, i) => {
    setSelectedPoint(null);
    getLocation(lat, lng).then((res) => setLocation(res));
    setInfoPosition({ lat: lat, lng: lng });
    setShowInfo(true);
    setIndex(i);
  };

  const closeInfoWindow = () => {
    setShowInfo(false);
    setInfoPosition("");
  };

  return waypoints.length >= 2 ? (
    <GoogleMap
      zoom={20}
      center={{ lat: waypoints[0].lat, lng: waypoints[0].lng }}
    >
      {waypoints && (
        <>
          <Polyline path={waypoints} options={{ strokeColor: "#FF0000 " }} />
          {waypoints.map((waypoint, i) => (
            <Marker
              onClick={() => onMarkerClick(waypoint.lat, waypoint.lng, i)}
              key={`${waypoint?.lat}_${waypoint?.lng}_${i}`}
              icon={{
                url:
                  i === waypoints?.length - 1
                    ? "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg",
                scaledSize: new window.google.maps.Size(20, 20),
                anchor: { x: 10, y: 10 },
              }}
              position={waypoint}
            />
          ))}
        </>
      )}
      {showInfo && (
        <InfoWindow onCloseClick={closeInfoWindow} position={infoPosition}>
          <div>
            {index !== -1 && props?.waypoints[index]?.signalStrength && (
              <Typography variant="body2">
                Signal Strength: {props?.waypoints[index]?.signalStrength}
              </Typography>
            )}
            <Typography variant="body2">Location: {location}</Typography>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <GoogleMap zoom={14} center={{ lat: 14.5, lng: 77.6 }}></GoogleMap>
  );
};

const MapComponent = withGoogleMap(Map);

export default function DeepDiveMaps(props) {
  return (
    <MapComponent
      containerElement={<div style={{ height: `87vh`, width: "100%" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      waypoints={props.waypoints}
    />
  );
}
