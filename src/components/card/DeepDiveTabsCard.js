import React from "react";
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
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
} from "@material-ui/core";
import Progress from "../progress/Progress";
import ReactSpeedometer from "react-d3-speedometer";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import "./DeepDiveTabsCard.css";
import { getAllTripAnalyticData } from "../../api/trip.api";

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
}));

export default function DeepDiveTabsCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [trips, setTrips] = React.useState([]);

  React.useEffect((trips) => {

    getAllTripAnalyticData(props.vehicleDetails.assetId).then(response => {
    })

  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab
            style={{ textTransform: "capitalize" }}
            label="Dashboard"
            {...a11yProps(0)}
          />
          <Tab
            style={{ textTransform: "capitalize" }}
            label="Trips"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Driver:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.driver}
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
              {props.vehicleDetails.time}
            </Typography>
          </div>
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.firstDiv}>
            <Typography variant="body2" component="p">
              Geofence:
            </Typography>
          </div>
          <div className={classes.secondDiv}>
            <Typography variant="body2" component="p">
              {props.vehicleDetails.geofence}
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
              {props.vehicleDetails.location}
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
              {props.vehicleDetails.status}
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
              {props.vehicleDetails.oddometer}
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
              {props.vehicleDetails.engineHours}
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
              {props.vehicleDetails.backupBattery}
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
              {props.vehicleDetails.batteryVoltage}
            </Typography>
          </div>
        </div>
        <Typography component="div">
          <Progress
            value={
              props.vehicleDetails.speed !== undefined
                ? props.vehicleDetails.speed
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
              value={props.vehicleDetails.speed}
              maxValue={360}
            />
          </div>
          <div>
            <ReactSpeedometer
              id="fuel"
              height={100}
              needleHeightRatio={0.7}
              width={150}
              value={props.vehicleDetails.fuel}
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
      </TabPanel>
      <TabPanel style={{ padding: 0 }} value={value} index={1}>
        <Grid container>
          <Grid item lg={12}>
            {props.trips.map((trip, index) => (
              <List style={{ paddingTop: 0, paddingBottom: 0 }} key={index}>
                <ListItem
                  onClick={() => props.tripClickHandler(trip.places)}
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
                              {trip.startLocation}
                            </TimelineContent>
                          </Tooltip>
                          <div className={classes.dateAndTimeDiv}>
                            <p style={{ marginTop: "0.35rem" }}>
                              {trip.startDate} {trip.killometers}
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
                              {trip.endDate} {trip.journeyDuration}
                            </p>
                          </div>
                        </TimelineItem>
                      </Timeline>
                    </ThemeProvider>
                  </ListItemText>
                </ListItem>
                <Divider />
              </List>
            ))}
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
}
