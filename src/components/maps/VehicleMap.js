/*global google*/
import React, { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import Typography from "@material-ui/core/Typography";
import car from "../../assets/images/car.png";
import { DirectionsService } from "@react-google-maps/api";
import { DIRECTIONS_RENDERER } from "react-google-maps/lib/constants";
import { getLocation } from "../../utils/getLocation";

export const VehicleMap = compose(
  withProps({
    containerElement: <div style={{ minHeight: `100%` }} />,
    mapElement: <div style={{ minHeight: `42.85rem` }} />,
  }),
  withGoogleMap
)((props) => {
  const [directions, setDirections] = useState();
  const [errors, setErrors] = useState();
  const [showInfo, setShowInfo] = useState();
  const [selectedPoint, setSelectedPoint] = useState();
  const [infoPosition, setInfoPosition] = useState();
  const [location, setLocation] = useState("");

  const onMarkerClick = () => {
    setSelectedPoint(null);
    getLocation(props?.lat, props?.lng).then((res) => setLocation(res));
    setInfoPosition({ lat: props.lat, lng: props.lng });
    setShowInfo(true);
  };

  const onRouteMarkerClick = (point) => () => {
    setSelectedPoint(point);
    setInfoPosition({ lat: point.lat, lng: point.lng });
    setShowInfo(true);
  };

  const getRoute = () => {
    const waypoints = props.directions.map((p) => ({
      location: { lat: p.lat, lng: p.lng },
      stopover: false,
    }));
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: props.origin,
        destination: props.destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setErrors(result);
        }
      }
    );
    return (
      <>
        {props.directions && (
          <>
            <Marker position={props.origin} onClick={props.openInfoWindow} />
            <Marker
              position={props.destination}
              onClick={props.openInfoWindow}
            />
            {props.directions.map((p) => (
              <Marker
                position={{ lat: p.lat, lng: p.lng }}
                onClick={onRouteMarkerClick(p)}
              />
            ))}
            {props.directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressInfoWindows: false,
                }}
              />
            )}
          </>
        )}
      </>
    );
  };

  const getSingleMarker = () => {
    return props.isMarkerShown ? (
      <Marker
        onClick={onMarkerClick}
        icon={{ url: car, labelOrigin: new window.google.maps.Point(15, 40) }}
        label={{
          text: props.vid !== "" ? props.vid : "Car",
          fontWeight: "bold",
        }}
        position={{ lat: props.lat, lng: props.lng }}
      />
    ) : (
      <></>
    );
  };

  return (
    <GoogleMap
      ref={(map) => map && map.panTo({ lat: props.lat, lng: props.lng })}
      defaultZoom={8}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.isRoute ? getRoute() : getSingleMarker()}
      {showInfo && (
        <InfoWindow
          onCloseClick={props.closeInfoWindow}
          position={infoPosition}
        >
          {props.isRoute ? (
            <div>
              <Typography variant="body1">
                Speed: {selectedPoint.speed}
              </Typography>

              <Typography variant="body2">
                Main Battery: {selectedPoint.mainBattery}
              </Typography>

              <Typography variant="body2">
                Signal Strength: {selectedPoint.signalStrength} -
              </Typography>
            </div>
          ) : (
            <div>
              {/* {props.vid !== "" ? (
              <Typography variant="body1">VId: {props.vid}</Typography>
            ) : (
              ""
            )} */}
              {props.status !== "" ? (
                <Typography variant="body2">Status: {props.status}</Typography>
              ) : (
                ""
              )}
              <Typography variant="body2">Location: {location}</Typography>
            </div>
          )}
        </InfoWindow>
      )}
    </GoogleMap>
  );
});
