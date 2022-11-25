import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
  Button,
  CardActionArea,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, CardActions } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Progress from "../progress/Progress";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import Popover from "@material-ui/core/Popover";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactSpeedometer from "react-d3-speedometer";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import "./DeepDiveTabsCard.css";
import { getAllTripAnalyticData, getAllTrips } from "../../api/trip.api";
import { getLocation } from "../../utils/getLocation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`deepdive-tabpanel-${index}`}
      aria-labelledby={`deepdive-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={props.style} p={3}>
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
    id: `deepdive-tab-${index}`,
    "aria-controls": `deepdive-tabpanel-${index}`,
  };
}

const theme = createMuiTheme({
  overrides: {
    MuiTimelineItem: {
      missingOppositeContent: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "25rem",
    position: "relative",
    top: "-85vh",
    backgroundColor: "white",
    left: "0.5rem",
    height: "75vh",
    overflow: "scroll",
  },
  appBar: {
    backgroundColor: "white",
    color: "green",
  },
  mainDiv: {
    display: "flex",
  },
  firstDiv: {
    width: "45%",
  },
  secondDiv: {
    width: "55%",
  },
  chartsDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  timelineDiv: {
    width: "170px",
    fontSize: "small",
  },
  timelineContent: {
    display: "block",
    minWidth: "9rem",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    height: "fit-content",
  },
  dateAndTimeDiv: {
    fontSize: "small",
  },
  analyseTrip: {
    textTransform: "none",
  },
  analyseTripContainer: {
    marginBottom: "0.5rem",
    textAlign: "end",
    marginRight: "0.5rem",
  },
  subTripsContainer: {
    height: 400,
    overflow: "scroll",
  },
  subTripsTopSection: {
    display: "flex",
    padding: "0.5rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTripCard: {
    minWidth: 350,
    margin: "0px 0.5rem",
    marginBottom: "1rem",
    boxShadow: "none",
  },
  tripTitle: {
    margin: "0px 0.5rem",
    fontWeight: "bold",
  },
  subTripContent: {
    display: "flex",
  },
  contentDetails: {
    width: "50%",
    display: "flex",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    width: "50%",
    display: "flex",
    alignItems: "center",
    margin: "0.25rem 0px",
    color: "dimGray",
  },
  value: {
    fontSize: 12,
    fontWeight: 400,
    width: "50%",
    display: "flex",
    alignItems: "center",
    margin: "0.25rem 0px",
    color: "gray",
  },
}));

export default function DeepDiveTabsCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { assetId, imei } = useParams();
  const [trips, setTrips] = React.useState([]);
  const [location, setLocation] = useState("");
  const [trip, setTrip] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "sub-trips-popover" : undefined;

  React.useEffect((trips) => {
    getAllTrips(assetId).then((response) => {
      setTrips(response);
    });
    getLocation(
      props?.vehicleDetails?.lat,
      props?.vehicleDetails?.longitude
    ).then((rs) => setLocation(rs));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTripAnalytics = (tripId) => {
    getAllTripAnalyticData(imei, tripId).then((response) => {
      setTrip(response);
    });
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="deep dive tabs"
        >
          {/* <Tab
            style={{ textTransform: "capitalize" }}
            label="Dashboard"
            {...a11yProps(0)}
          /> */}
          <Tab
            style={{ textTransform: "capitalize" }}
            label="Trips"
            {...a11yProps(0)}
          />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Driver:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.driverName ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Time:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.dateTime ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Location:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {location ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Address:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.location ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Status:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.status ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Distance(Km):
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.odometer ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Engine hours:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.engHrs ?? ""}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Backup battery:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.backupBattery ?? ""}
            </Typography>
          </div>
        </div>
        <div
          style={{ marginTop: "1rem", display: "flex", marginBottom: "1rem" }}
        >
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Battery Voltage:
            </Typography>
          </div>
          <div className={classes.secondDiv} style={{ textAlign: "right" }}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.batteryVoltage ?? ""}
            </Typography>
          </div>
        </div>
        <Typography component="div">
          <Progress
            value={
              props.vehicleDetails.speedViolations !== undefined
                ? props.vehicleDetails.speedViolations
                : 50
            }
          />
        </Typography>
        <div className={classes.chartsDiv}>
          <div>
            <ReactSpeedometer
              id="speed"
              height={100}
              needleHeightRatio={0.7}
              width={150}
              value={props.vehicleDetails.speedViolations ?? 0}
              maxValue={360}
            />
          </div>
          <div>
            <ReactSpeedometer
              id="fuel"
              height={100}
              needleHeightRatio={0.7}
              width={150}
              value={props.vehicleDetails.fuelLevel ?? 0}
              maxValue={650}
            />
          </div>
        </div>
        <div
          style={{ marginTop: "1rem", display: "flex", marginBottom: "1rem" }}
        >
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Coolant Temp:
            </Typography>
          </div>
          <div className={classes.secondDiv} style={{ textAlign: "right" }}>
            <Typography variant="body2" component="p">
              0 Celsius
            </Typography>
          </div>
        </div>
        <Typography component="div">
          <Progress value={0} />
        </Typography>
        <div
          style={{ marginTop: "1rem", display: "flex", marginBottom: "1rem" }}
        >
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Oil Temp:
            </Typography>
          </div>
          <div className={classes.secondDiv} style={{ textAlign: "right" }}>
            <Typography variant="body2" component="p">
              10 Celsius
            </Typography>
          </div>
        </div>
        <Typography component="div">
          <Progress value={10} />
        </Typography>
        <div
          style={{ marginTop: "1rem", display: "flex", marginBottom: "1rem" }}
        >
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Engine Load:
            </Typography>
          </div>
          <div className={classes.secondDiv} style={{ textAlign: "right" }}>
            <Typography variant="body2" component="p">
              20 Celsius
            </Typography>
          </div>
        </div>
        <Typography component="div">
          <Progress value={20} />
        </Typography>
      </TabPanel> */}
      <TabPanel style={{ padding: 0 }} value={value} index={0}>
        <Grid container>
          <Grid item lg={12}>
            {trips.map((trip, index) => (
              <List
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
                key={trip.tripId}
              >
                <ListItem
                  onClick={() => props.tripClickHandler(trip.tripId)}
                  style={{ whiteSpace: "noWrap", textOverflow: "ellipsis" }}
                  button
                >
                  <ListItemText>
                    <ThemeProvider theme={theme}>
                      <Timeline className={classes.timelineDiv}>
                        <TimelineItem style={{ whiteSpace: "none" }}>
                          <TimelineSeparator>
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <Tooltip
                            arrow
                            placement="bottom-start"
                            title={trip.startLocation}
                            aria-label="end-location"
                          >
                            <TimelineContent
                              className={classes.timelineContent}
                            >
                              {trip?.startLocation}
                            </TimelineContent>
                          </Tooltip>
                          <div className={classes.dateAndTimeDiv}>
                            <p style={{ marginTop: "0.35rem" }}>
                              {new Date(trip.startTime * 1000).getUTCDate() +
                                "/" +
                                (new Date(trip.startTime * 1000).getUTCMonth() +
                                  1) +
                                "/" +
                                new Date(
                                  trip.startTime * 1000
                                ).getUTCFullYear()}
                              {`, Total Km: ${trip.totalDistance}`}
                            </p>
                          </div>
                        </TimelineItem>
                        <TimelineItem style={{ whiteSpace: "none" }}>
                          <TimelineDot color="secondary" />
                          <Tooltip
                            arrow
                            placement="bottom-start"
                            title={trip.endLocation}
                            aria-label="end-location"
                          >
                            <TimelineContent
                              className={classes.timelineContent}
                            >
                              {trip.endLocation}
                            </TimelineContent>
                          </Tooltip>
                          <div className={classes.dateAndTimeDiv}>
                            <p style={{ marginTop: "0.35rem" }}>
                              {new Date(trip.endTime * 1000).getUTCDate() +
                                "/" +
                                (new Date(trip.endTime * 1000).getUTCMonth() +
                                  1) +
                                "/" +
                                new Date(trip.endTime * 1000).getUTCFullYear()}
                              {`, Duration: ${new Date(
                                trip.endTime - trip.startTime
                              ).getHours()} Hrs`}
                            </p>
                          </div>
                        </TimelineItem>
                      </Timeline>
                    </ThemeProvider>
                  </ListItemText>
                </ListItem>
                <div className={classes.analyseTripContainer}>
                  <Button
                    className={classes.analyseTrip}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      getTripAnalytics(trip?.tripId);
                    }}
                  >
                    Analyse Trip
                  </Button>
                </div>
                <Divider />
              </List>
            ))}
          </Grid>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          className={classes.subTripsPopOver}
        >
          <div className={classes.subTripsContainer}>
            <div className={classes.subTripsTopSection}>
              <Typography style={{ color: "green" }} variant="body1">
                Sub Trips
              </Typography>
              <IconButton
                size="small"
                onClick={handleClose}
                aria-label="close-filter"
              >
                <CloseIcon />
              </IconButton>
            </div>
            {console.log(trip)}
            {trip !== null && (
              <>
                <div className={classes.topPortion}>
                  <div>Driver Name:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.driverName}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Asset Name:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.assetName}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Average Speed:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.avgSpeed}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Total Distance:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.totalDistance}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Average Mileage:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.avgMileage}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Fuel Level:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.fuelStart}
                  </div>
                </div>
                <div className={classes.topPortion}>
                  <div>Registration Number:</div>
                  <div className={classes.topPortionValues}>{trip?.regNo}</div>
                </div>
                <div className={classes.topPortion}>
                  <div>Trip Status:</div>
                  <div className={classes.topPortionValues}>
                    {trip?.tripStatus}
                  </div>
                </div>
              </>
            )}
            {(trip !== null && trip?.subTripDataList) ||
              [].map((subTrip, i) => (
                <div key={subTrip?.startLocation}>
                  <Typography className={classes.tripTitle}>{`Trip ${
                    i + 1
                  }`}</Typography>
                  <Card
                    key={subTrip?.startTime}
                    className={classes.subTripCard}
                  >
                    <CardActionArea>
                      <div className={classes.subTripContent}>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>Start Time: </div>
                          <div className={classes.value}>
                            {new Date(subTrip.startTime * 1000).getUTCDate() +
                              "/" +
                              (new Date(
                                subTrip.startTime * 1000
                              ).getUTCMonth() +
                                1) +
                              "/" +
                              new Date(
                                subTrip.startTime * 1000
                              ).getUTCFullYear()}
                          </div>
                        </div>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>End Time:</div>
                          <div className={classes.value}>
                            {new Date(subTrip.endTime * 1000).getUTCDate() +
                              "/" +
                              (new Date(subTrip.endTime * 1000).getUTCMonth() +
                                1) +
                              "/" +
                              new Date(subTrip.endTime * 1000).getUTCFullYear()}
                          </div>
                        </div>
                      </div>
                      <div className={classes.subTripContent}>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>Start Location:</div>
                          <div className={classes.value}></div>
                        </div>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>End Location:</div>
                          <div className={classes.value}></div>
                        </div>
                      </div>
                      <div className={classes.subTripContent}>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>Status: </div>
                          <div className={classes.value}>
                            {subTrip?.status === "S"
                              ? "Stopped"
                              : subTrip?.status === "M"
                              ? "Moving"
                              : ""}
                          </div>
                        </div>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>
                            Distance Travelled:{" "}
                          </div>
                          <div className={classes.value}>
                            {subTrip?.distanceTravelled}
                          </div>
                        </div>
                      </div>
                      <div className={classes.subTripContent}>
                        <div className={classes.contentDetails}>
                          <div className={classes.label}>Avg Mileage: </div>
                          <div className={classes.value}>
                            {subTrip?.avgMileage}
                          </div>
                        </div>
                      </div>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
          </div>
        </Popover>
      </TabPanel>
    </div>
  );
}
