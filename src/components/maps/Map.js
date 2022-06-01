import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "75vh",
  width: "100%",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

let latLngs = [
  { lat: 16.506174, lng: 80.648018 },
  { lat: 16.556174, lng: 80.698018 },
  { lat: 16.606174, lng: 80.748018 },
  { lat: 16.656174, lng: 80.798018 },
  { lat: 16.706174, lng: 80.848018 },
  { lat: 16.750174, lng: 80.898018 },
  { lat: 16.800174, lng: 80.948018 },
  { lat: 16.850174, lng: 80.998018 },
  { lat: 16.900174, lng: 81.04018 },
  { lat: 16.950174, lng: 81.098018 },
];

export default function Map() {
  const onMapClick = React.useCallback((e) => {}, []);

  const [state, setState] = React.useState({
    directions: null,
    waypoints: [],
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(
    (map) => {
      mapRef.current = map;
      const directionsService = new window.google.maps.DirectionsService();
      const origin = latLngs[0];
      let destination = latLngs[1];

      let direcionsDisplay = new window.google.maps.DirectionsRenderer();

      let googleMaps = new window.google.maps.Map(
        document.getElementById("map")
      );

      direcionsDisplay.setMap(googleMaps);

      let counter = 1;
      setInterval(() => {
        if (counter <= 8) {
          state.waypoints.push({
            location: new window.google.maps.LatLng(
              destination.lat,
              destination.lng
            ),
          });
          destination = latLngs[++counter];
          route(origin, destination);
        }
      }, 5000);

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            direcionsDisplay.setDirections(result);
            setState((prevState) => ({
              ...prevState,
              directions: result,
            }));
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      const route = (origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            waypoints: state.waypoints,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              direcionsDisplay.setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      };
    },
    [state.waypoints]
  );

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={new window.google.maps.LatLng(16.506174, 80.648018)}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    ></GoogleMap>
  );
}
