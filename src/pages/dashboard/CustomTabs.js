import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import VehicleDetailsCard from "../../components/card/VehicleDetailsCard";
import { VehicleMap } from "../../components/maps/VehicleMap";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStickyNote,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Typography } from "@material-ui/core";
import "./CustomTabs.css";
import { Fragment } from "react";
import DatePicker from "../../components/datepicker/DatePicker";
import LiveOverView from "./LiveOverView";
import Trips from "./Trips";
import DriverBehaviour from "./DriverBehaviour";
import Fuel from "./Fuel";
import Efficiency from "./Efficiency";
import ReportsSidebar from "./ReportsSidebar";
import EventsTab from "./EventsTab";
import { vehicles } from "../../components/data/Data";
import EngineImmobilizer from "./EngineImmobilzer";
import TiltAndElevation from "./TiltAndElevation";
import SuddenAccelerationAndHarshBraking from "./SuddenAccelerationAndHarshBraking";
import { getLocations } from "../../api/assets.api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vehicle-details-tabpanel-${index}`}
      aria-labelledby={`vehicle-details-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={props.box} p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vehicle-details-tab-${index}`,
    "aria-controls": `vehicle-details-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  reportsBox: {
    paddingLeft: 0,
    paddingTop: 1,
    paddingRight: 0,
  },
  mapBox: {
    padding: 0,
  },
  eventsBox: {
    padding: 0,
  },
  indicator: {
    backgroundColor: "green",
  },
  donutRow: {
    height: "15rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function CustomTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [reportsList, setReportsList] = React.useState({
    liveOverView: true,
    trips: false,
    driverBehaviour: false,
    fuel: false,
    efficiency: false,
    engineImmobilizer: false,
    tiltAndElevation: false,
    suddenAccelerationAndHarshBraking: false
  });
  const [vehicleStatusPercent, setVehicleStatusPercent] = React.useState({
    runningPercent: 0,
    stoppedPercent: 0,
    faultyPercent: 0,
    totalRunningVehicles: 0,
  });
  const [vehicleOddometerPercent, setVehicleOddometerPercent] = React.useState({
    belowFiveThousand: 0,
    belowEightThousand: 0,
    belowTenThousand: 0,
  });
  const [vehicleFuelPercent, setVehicleFuelPercent] = React.useState({
    belowTwoHundred: 0,
    belowFiveHundred: 0,
    belowSevenHundred: 0,
  });
  const [selectedVehicleCategory, setSelectedVehicleCategory] =
    React.useState("");
  const [fuelConsumption, setFuelConsumption] = React.useState({
    normal: null,
    idle: null,
  });

  const [vehiclesArray, setVehiclesArray] = React.useState();

  const [routes, setRoutes] = React.useState([]);
  const [showRoutes, setShowRoutes] = React.useState(false);
  const [routesTimeGap, setRouteTimeGap] = React.useState('lasthour'); // in minutes

  useEffect(() => {

    if(props.vehicleDetails && props.vehicleDetails.imei){
 
    const date = new Date();
    switch(routesTimeGap){
      case 'lasthour':
        date.setHours(date.getHours() - 1);
        break;
      case 'lastday':
        date.setHours(date.getHours() - 24);
        break;
      case 'lastweek':
        date.setHours(date.getHours() - 168);
        break;
      default:
        date.setHours(date.getHours() - 1);
        break;
    }
    
    const startTime = date.getTime();
    const endTime = (new Date()).getTime();

    getLocations(props.vehicleDetails.imei, startTime, endTime).then((response) => {
      setRoutes(response.locationStructList || []);
      setShowRoutes(true)
    });
  }
  }, [props.assetId])

  useEffect(() => {
    const vehiclesCategory = props.selectedList;
    let vehiclesArray = [];
    let selectedVehicleCategory = "";
    let normalFuleConsumption = null;
    let idleFuleConsumption = null;

    switch (vehiclesCategory) {
      case "showAll":
        vehiclesArray = vehicles[0].vehiclesList;
        selectedVehicleCategory = "All Vehicles";
        normalFuleConsumption = 35;
        idleFuleConsumption = 65;
        break;
      case "commercial":
        vehiclesArray = vehicles[1].vehiclesList;
        selectedVehicleCategory = "Commercial";
        normalFuleConsumption = 25;
        idleFuleConsumption = 75;
        break;
      case "nonCommercial":
        vehiclesArray = vehicles[2].vehiclesList;
        selectedVehicleCategory = "Non Commercial";
        normalFuleConsumption = 68;
        idleFuleConsumption = 32;
        break;
      case "lightWeight":
        vehiclesArray = vehicles[3].vehiclesList;
        selectedVehicleCategory = "Light Weight";
        normalFuleConsumption = 59;
        idleFuleConsumption = 41;
        break;
      case "heavyWeight":
        vehiclesArray = vehicles[4].vehiclesList;
        selectedVehicleCategory = "Heavy Weight";
        normalFuleConsumption = 53;
        idleFuleConsumption = 47;
        break;
      default:
        console.log("Invalid category");
    }

    let running = 0;
    let stopped = 0;
    let faulty = 0;
    let belowFiveThousand = 0;
    let belowEightThousand = 0;
    let belowTenThousand = 0;
    let belowTwoHundred = 0;
    let belowFiveHundred = 0;
    let belowSevenHundred = 0;

    vehiclesArray.map((vehicle) =>
      vehicle.status === "Running"
        ? running++
        : vehicle.status === "Stopped"
          ? stopped++
          : faulty++
    );

    vehiclesArray.map((vehicle) =>
      vehicle.oddometer <= 5000
        ? belowFiveThousand++
        : vehicle.oddometer > 5000 && vehicle.oddometer < 7500
          ? belowEightThousand++
          : belowTenThousand++
    );

    vehiclesArray.map((vehicle) =>
      vehicle.fuel <= 200
        ? belowTwoHundred++
        : vehicle.fuel > 200 && vehicle.fuel <= 500
          ? belowFiveHundred++
          : belowSevenHundred++
    );

    let runningPercent = Math.floor((running / vehiclesArray.length) * 100);
    let stoppedPercent = Math.floor((stopped / vehiclesArray.length) * 100);
    let faultyPercent = Math.floor((faulty / vehiclesArray.length) * 100);

    let belowFiveThousandPercent = Math.floor(
      (belowFiveThousand / vehiclesArray.length) * 100
    );
    let belowEightThousandPercent = Math.floor(
      (belowEightThousand / vehiclesArray.length) * 100
    );
    let belowTenThousandPercent = Math.floor(
      (belowTenThousand / vehiclesArray.length) * 100
    );

    let belowTwoHundredPercent = Math.floor(
      (belowTwoHundred / vehiclesArray.length) * 100
    );
    let belowFiveHundredPercent = Math.floor(
      (belowFiveHundred / vehiclesArray.length) * 100
    );
    let belowSevenHundredPercent = Math.floor(
      (belowSevenHundred / vehiclesArray.length) * 100
    );

    setVehicleStatusPercent({
      running: runningPercent,
      stopped: stoppedPercent,
      faulty: faultyPercent,
      totalRunningVehicles: running,
    });

    setVehicleOddometerPercent({
      belowFiveThousand: belowFiveThousandPercent,
      belowEightThousand: belowEightThousandPercent,
      belowTenThousand: belowTenThousandPercent,
    });

    setVehicleFuelPercent({
      belowTwoHundred: belowTwoHundredPercent,
      belowFiveHundred: belowFiveHundredPercent,
      belowSevenHundred: belowSevenHundredPercent,
    });

    setFuelConsumption({
      normal: normalFuleConsumption,
      idle: idleFuleConsumption,
    });

    setVehiclesArray(vehiclesArray);
    setSelectedVehicleCategory(selectedVehicleCategory);
  }, [props.selectedList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const listItemClickHandler = (name) => {
    setReportsList({
      [name]: true,
    });
  };

  
  
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
      >
        <Tabs
          indicatorColor="primary"
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="vehicle details tabs"
        >
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Map View
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faStickyNote} /> Live Data
              </div>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Events
              </div>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <Divider />
      <TabPanel box={classes.mapBox} value={value} index={0}>
        {props.display === "block" ? (
          <Grid
            container
            style={{ width: "auto", position: "absolute", zIndex: 1 }}
          >
            <Grid item lg={2}>
              <VehicleDetailsCard
                vehicleDetails={props.vehicleDetails}
                onClose={props.onClose}
                setRouteTimeGap={setRouteTimeGap}
              />
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <VehicleMap
          closeInfoWindow={props.closeInfoWindow}
          vid={props.vid}
          openInfoWindow={props.openInfoWindow}
          isOpenInfoWindow={props.isOpenInfoWindow}
          isMarkerShown={props.isMarkerShown}
          lat={props.lat}
          lng={props.lng}
          status={props.status}
          location={props.location}
          isRoute={showRoutes && routes.length > 0}
          origin={{ lat: 22.293147151391796, lng: 73.16025681813052 }}
          destination={{ lat: 24.765771788199572, lng: 73.72605267807154 }}
          directions={routes}
        />
      </TabPanel>
      <TabPanel box={classes.reportsBox} value={value} index={1}>
        {props.selectedList ? (
          <Grid container>
            <ReportsSidebar listItemClickHandler={listItemClickHandler} />
            <Grid
              item
              lg={10}
              style={{ height: "42.5rem", overflowY: "scroll" }}
            >
              <div
                style={{
                  height: "7%",
                  display: "flex",
                  backgroundColor: "white",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {reportsList.trips ||
                  reportsList.driverBehaviour ||
                  reportsList.fuel ||
                  reportsList.efficiency ? (
                  <Fragment>
                    <Typography style={{ marginRight: "0.25rem" }}>
                      Report Time
                    </Typography>
                    <div className="col-15">
                      <select id="duration" name="duration">
                        <option value="oneDay">One Day</option>
                        <option value="oneWeek">One Week</option>
                        <option value="oneMonth">One Month</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <DatePicker />
                  </Fragment>
                ) : (
                  ""
                )}
                <div>
                  <Button
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: "green",
                      borderRadius: 0,
                      height: "2.5rem",
                      color: "white",
                      marginRight: "0.25rem",
                    }}
                  >
                    Execute
                  </Button>
                </div>
              </div>
              <Divider />
              {reportsList.liveOverView && (
                <LiveOverView
                  vehicles={vehiclesArray}
                  vehicleStatusPercent={vehicleStatusPercent}
                  vehicleOddometerPercent={vehicleOddometerPercent}
                  vehicleFuelPercent={vehicleFuelPercent}
                />
              )}
              {reportsList.trips && (
                <Trips
                  vehicleStatusPercent={vehicleStatusPercent}
                  selectedVehicleCategory={selectedVehicleCategory}
                  vehicles={vehiclesArray}
                />
              )}
              {reportsList.driverBehaviour && (
                <DriverBehaviour
                  vehicleStatusPercent={vehicleStatusPercent}
                  vehicles={vehiclesArray}
                  selectedVehicleCategory={selectedVehicleCategory}
                />
              )}
              {reportsList.fuel && (
                <Fuel
                  vehicles={vehiclesArray}
                  fuelConsumption={fuelConsumption}
                  selectedVehicleCategory={selectedVehicleCategory}
                />
              )}
              {reportsList.efficiency && (
                <Efficiency
                  vehicles={vehiclesArray}
                  selectedVehicleCategory={selectedVehicleCategory}
                  vehicleStatusPercent={vehicleStatusPercent}
                />
              )}
              {reportsList.engineImmobilizer && (
                <EngineImmobilizer />
              )}
              {reportsList.tiltAndElevation && (
                <TiltAndElevation
                />
              )}
              {reportsList.suddenAccelerationAndHarshBraking && (
                <SuddenAccelerationAndHarshBraking
                />
              )}
            </Grid>
          </Grid>
        ) : (
          <div className="select-vehicle-text-display-div">
            <Typography variant="body1">
              Please Select Vehicle Category
            </Typography>
          </div>
        )}
      </TabPanel>
      <TabPanel box={classes.eventsBox} value={value} index={2}>
        {props.vid !== "" ? (
          <Grid container>
            <Grid
              item
              lg={12}
              style={{ height: "42.5rem", overflowY: "scroll" }}
            >
              <Divider />
              <EventsTab
                vehicles={vehiclesArray}
                selectedVehicleCategory={selectedVehicleCategory}
              />
            </Grid>
          </Grid>
        ) : (
          <div className="select-vehicle-text-display-div">
            <Typography variant="body1">Please Select Vehicles...</Typography>
          </div>
        )}
      </TabPanel>
    </div>
  );
}
