import React, { Component, Fragment, useEffect, useState } from "react";
import "./DeepDive.css";
import Header from "../../components/header/Header";
import { Container, Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import DeepDiveMaps from "../../components/maps/DeepDiveMaps";
import DeepDiveTabsCard from "../../components/card/DeepDiveTabsCard";
import Footer from "../../components/footer/Footer";
import { Chart } from "react-google-charts";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { getCurrentData, getLocations } from "../../api/assets.api";
import moment from "moment";
import { getTripDetailByUsingTripId } from "../../api/trip.api";

const styles = (theme) => ({
  timelineGrid: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    top: "2rem",
  },
});

const DeepDive = (props) => {
  const params = useParams();

  sessionStorage.setItem("issuedToken", params.issuedToken);

  const [waypoints, setWayPoints] = useState([]);

  const [durationValue, setDurationValue] = useState(params.duration);

  const [refreshCnt, setRefreshCnt] = useState(0);

  const { assetId } = useParams();

  const [vehicleDetails, setVehicleDetails] = useState(null);

  const [trips, setTrips] = useState([]);
  const [lastEndTime, setLastEndTime] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    let startTime = moment().subtract(1, "h").unix();

    if (lastEndTime != null) {
      startTime = lastEndTime;
    } else {
      switch (durationValue) {
        case "lasthour":
          startTime = moment().subtract(1, "h").unix();
          break;
        case "lastday":
          startTime = moment().subtract(1, "d").unix();
          break;
        case "lastweek":
          startTime = moment().subtract(7, "d").unix();
          break;
        default:
          startTime = moment().subtract(1, "m").unix();
          break;
      }
    }

    const endTime = moment().unix();

    const vehicleDetails = getCurrentData(assetId).then((res) => {
      setVehicleDetails(res);
    });

    getLocations(params.imei, startTime, endTime).then((response) => {
      if (response.locationStructList) {
        setWayPoints([...waypoints, ...response.locationStructList]);
        setLastEndTime(endTime);
      }
    });
  }, []);

  useEffect(() => {
    let startTime = moment().subtract(1, "h").unix();

    switch (durationValue) {
      case "lasthour":
        startTime = moment().subtract(1, "h").unix();
        break;
      case "lastday":
        startTime = moment().subtract(1, "d").unix();
        break;
      case "lastweek":
        startTime = moment().subtract(7, "d").unix();
        break;
      default:
        startTime = moment().subtract(1, "m").unix();
        break;
    }

    const endTime = moment().unix();

    getLocations(params.imei, startTime, endTime).then((response) => {
      setWayPoints(response.locationStructList || []);
      setLastEndTime(endTime);
    });
  }, [durationValue]);

  const getLocation = (loc) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: loc,
      },
      function (results) {
        setWayPoints((state) => [
          ...state,
          {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
          },
        ]);
      }
    );
  };

  const tripClickHandler = (tripId) => {
    setWayPoints([]);
    const tripDetails = getTripDetailByUsingTripId(tripId);
    tripDetails.then((res) => {
      getLocation(res?.startLocation);
      if (res?.breakPoints && res?.breakPoints !== undefined) {
        res.breakPoints.map((breakpoint) => getLocation(breakpoint));
      }
      getLocation(res?.endLocation);
    });
  };

  const handleChange = (e) => {
    let name = e.target.name;
  };

  return (
    <Fragment>
      <Header />
      <Container className="deepdive-main-container">
        <Grid style={{ margin: "0.5rem 0px" }} container spacing={3}>
          <Grid item lg={3} xs={12}>
            <Typography
              style={{ paddingTop: "1rem", color: "green" }}
              variant="h6"
            >
              Deep Dive report: <span style={{ color: "#111" }}></span>
            </Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <div className="row">
              <div className="col-35">
                <select
                  id="duration"
                  name="duration"
                  value={durationValue}
                  onChange={(event) => {
                    setDurationValue(event.target.value);
                  }}
                >
                  <option value="lasthour">Last Hour</option>
                  <option value="lastday">Last Day</option>
                  <option value="lastweek">Last Week</option>
                </select>
              </div>
            </div>
          </Grid>
          <Grid className="excel-col" item lg={3}>
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFileExcel} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12} xs={12} style={{ height: "87vh", zIndex: 1 }}>
            <DeepDiveMaps key={waypoints} waypoints={waypoints} />
            {vehicleDetails !== null && (
              <DeepDiveTabsCard
                tripClickHandler={tripClickHandler}
                trips={trips}
                vehicleDetails={vehicleDetails}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default withStyles(styles)(DeepDive);
