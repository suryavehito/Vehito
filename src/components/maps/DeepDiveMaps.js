import React, { useState } from "react";
import { withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";

const Map = (props) => {
  const [waypoints, setWayPoints] = useState(
    props.waypoints.map((wp) => {
      return {
        lat: wp.latitude,
        lng: wp.longitude,
      };
    })
  );

  return waypoints.length >= 2 ? (
    <GoogleMap
      zoom={14}
      center={{ lat: waypoints[0].lat, lng: waypoints[0].lng }}
    >
      {waypoints && (
        <>
          <Polyline path={waypoints} options={{ strokeColor: "#FF0000 " }} />
          <Marker
            icon={{
              url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
              scaledSize: new window.google.maps.Size(20, 20),
              anchor: { x: 10, y: 10 },
            }}
            position={waypoints[waypoints - 1]}
          />
        </>
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
