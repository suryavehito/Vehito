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
import { data } from "./DeepdiveData";
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { getLocations } from "../../api/assets.api";
import moment from 'moment';

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

  sessionStorage.setItem("issuedToken", params.issuedToken)

  const [waypoints, setWayPoints] = useState([]);

  const [durationValue, setDurationValue] = useState(params.duration);

  const [refreshCnt, setRefreshCnt] = useState(0);

  const [stateData, setStateData] = useState({
    oiltemp: false,
    rpm: false,
    speed: false,
    coolantTemp: false,
    batteryVoltage: false,
    engineLoad: false,
    deepdiveData: data.rpm,
  });

  const [vehicleDetails, setVehicleDetails] = useState({})

  const [trips, setTrips] = useState([]);
  const [lastEndTime, setLastEndTime] = useState(null);

  useEffect(() => {
    let startTime = moment().subtract(1, 'h').unix();

    if (lastEndTime != null) {
      startTime = lastEndTime
    }
    else {
      switch (durationValue) {
        case 'lasthour':
          startTime = moment().subtract(1, 'h').unix();
          break;
        case 'lastday':
          startTime = moment().subtract(1, 'd').unix();
          break;
        case 'lastweek':
          startTime = moment().subtract(7, 'd').unix();
          break;
        default:
          startTime = moment().subtract(1, 'm').unix();
          break;
      }

    }

    const endTime = moment().unix();

    getLocations(params.imei, startTime, endTime).then((response) => {
      if (response.locationStructList) {
        setWayPoints([...waypoints, ...response.locationStructList]);
        setLastEndTime(endTime);
      }
    });
  }, [refreshCnt]);


  useEffect(() => {
    let startTime = moment().subtract(1, 'h').unix();

      switch (durationValue) {
        case 'lasthour':
          startTime = moment().subtract(1, 'h').unix();
          break;
        case 'lastday':
          startTime = moment().subtract(1, 'd').unix();
          break;
        case 'lastweek':
          startTime = moment().subtract(7, 'd').unix();
          break;
        default:
          startTime = moment().subtract(1, 'm').unix();
          break;
      }

    const endTime = moment().unix();

    getLocations(params.imei, startTime, endTime).then((response) => {
        setWayPoints(response.locationStructList || []);
        setLastEndTime(endTime);
    });
  }, [durationValue]);

  setInterval(() => {
    setRefreshCnt(refreshCnt + 1);
  }, 60000)

  const tripClickHandler = (waypoints) => {
    setWayPoints(waypoints);
  };

  const handleChange = (e) => {
    let name = e.target.name;

    if (name === "oiltemp") {
      setStateData({
        oiltemp: true,
        rpm: false,
        speed: false,
        coolantTemp: false,
        batteryVoltage: false,
        engineLoad: false,
        deepdiveData: data.oilTemp,
      });
      return;
    }

    if (name === "rpm") {
      setStateData({
        oiltemp: false,
        rpm: true,
        speed: false,
        coolantTemp: false,
        batteryVoltage: false,
        engineLoad: false,
        deepdiveData: data.rpm,
      });
      return;
    }

    if (name === "speed") {
      setStateData({
        oiltemp: false,
        rpm: false,
        speed: true,
        coolantTemp: false,
        batteryVoltage: false,
        engineLoad: false,
        deepdiveData: data.speed,
      });
      return;
    }

    if (name === "coolantTemp") {
      setStateData({
        oiltemp: false,
        rpm: false,
        speed: false,
        coolantTemp: true,
        batteryVoltage: false,
        engineLoad: false,
        deepdiveData: data.coolantTemp,
      });
      return;
    }

    if (name === "batteryVoltage") {
      setStateData({
        oiltemp: false,
        rpm: false,
        speed: false,
        coolantTemp: false,
        batteryVoltage: true,
        engineLoad: false,
        deepdiveData: data.batteryVoltage,
      });
      return;
    }

    if (name === "engineLoad") {
      setStateData({
        oiltemp: false,
        rpm: false,
        speed: false,
        coolantTemp: false,
        batteryVoltage: false,
        engineLoad: true,
        deepdiveData: data.engineLoad,
      });
      return;
    }
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
              Deep Dive report:{" "}
              <span style={{ color: "#111" }}>{vehicleDetails.vehicleName}</span>
            </Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <div className="row">
              <div className="col-35">
                <select id="duration" name="duration" value={durationValue} onChange={(event) => {
                  setDurationValue(event.target.value);
                }}>
                  <option value="lasthour">Last Hour</option>
                  <option value="lastday">Last Day</option>
                  <option value="lastweek">Last Week</option>
                </select>
              </div>
            </div>
          </Grid>
          <Grid className="excel-col" item lg={3}>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faFileExcel}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12} xs={12} style={{ height: "87vh", zIndex: 1 }}>
            <DeepDiveMaps
              key={waypoints}
              waypoints={waypoints}
            />
            <DeepDiveTabsCard
              tripClickHandler={tripClickHandler}
              trips={trips}
              vehicleDetails={vehicleDetails}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={2} style={{ paddingTop: "3.30rem" }}>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="oiltemp"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.oiltemp}
                  />
                }
                label="Oil Temp"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rpm"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.rpm}
                  />
                }
                label="RPM"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="speed"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.speed}
                  />
                }
                label="Speed"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="coolantTemp"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.coolantTemp}
                  />
                }
                label="Coolant Temp"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="batteryVoltage"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.batteryVoltage}
                  />
                }
                label="Battery Voltage"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="engineLoad"
                    color="primary"
                    onChange={handleChange}
                    checked={stateData.engineLoad}
                  />
                }
                label="Engine Load"
              />
            </div>
          </Grid>
          <Grid item lg={10}>
            <Chart
              width={"100%"}
              height={"350px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={stateData.deepdiveData}
              options={{
                width: 1050,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default withStyles(styles)(DeepDive);
