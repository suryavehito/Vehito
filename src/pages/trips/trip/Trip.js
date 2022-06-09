import {
  Avatar,
  Button,
  Container,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addTrip, getTripDetailById, updateTrip } from "../../../api/trip.api";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import AvatarModal from "../../../components/modal/AvatarModal";
import TripDetailsForm from "../form/TripDetailsForm";
import "./Trip.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#b2dfdb",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    marginTop: "3rem",
  },
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  textFields: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  gridList: {
    width: 500,
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    cursor: "pointer",
    "&:hover": {
      opacity: "0.5",
    },
  },
}));

export default function Trip(props) {
  let history = useHistory();

  let params = useParams();

  let tripId = params.tripId;

  const [isEditMode, setIsEditMode] = useState(props.new ? true : false);

  const classes = useStyles();

  const [tripData, setTripData] = React.useState({
    tripId: "",
    startLocation: "",
    endLocation: "",
    breakPoints: [],
    assetName: "",
    driverName: "",
    status: 1,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("issuedToken")) {
      history.push("/");
    }
    if (!props.new && tripId) {
      const response = getTripDetailById(tripId);
      response.then(setTripData);
    }
  }, []);

  const onAssetChange = (selectedAsset) => {
    if (selectedAsset) {
      setTripData({
        ...tripData,
        assetId: selectedAsset.assetId,
        assetName: `${selectedAsset.make} - ${selectedAsset.model}`,
        regNo: `${selectedAsset.regNum}`,
      });
    }
  };

  const saveBtnOnClickHandler = () => {
    const addAssetResponse = props.new
      ? addTrip(tripData)
      : updateTrip(tripData);
    addAssetResponse.then((addAstRes) => {
      if (props.new) {
        history.push("/trips");
      } else {
        toggleEditMode();
      }
    });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(" on chagne " + name + value);
    setTripData({ ...tripData, [name]: value });
  };

  const onDateChange = (event) => {
    const { name, value } = event.target;
    console.log(" on date chagne " + name + new Date(value).getTime());
    setTripData({ ...tripData, [name]: new Date(value).getTime() });
  };

  const onStartDateChange = (event) => {
    const { name, value } = event.target;
    console.log(" on date chagne " + name + new Date(value).getTime());
    setTripData({ ...tripData, [name]: new Date(value).getTime(), status: 3 });
  };

  const addBreakPoint = () => {
    setTripData({ ...tripData, breakPoints: [...tripData.breakPoints, ""] });
  };

  const removeBreakPoint = (index) => () => {
    const tmpBreakPoints = [
      ...tripData.breakPoints.slice(0, index),
      ...tripData.breakPoints.slice(index + 1, tripData.breakPoints.length),
    ];
    setTripData({ ...tripData, breakPoints: tmpBreakPoints });
  };
  const onBreakPointChange = (index) => (event) => {
    const tmpBreakPoints = [...tripData.breakPoints];
    tmpBreakPoints[index] = event.target.value;
    setTripData({ ...tripData, breakPoints: tmpBreakPoints });
  };

  return (
    <Fragment>
      <Header />
      <Container className={classes.container}>
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Tabs
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="scrollable force tabs example"
                value={0}
              >
                <Tab label="Trip Information" {...a11yProps(0)} />
              </Tabs>
            </AppBar>
          </ThemeProvider>
          <TabPanel value={0} index={0}>
            <div className={classes.gridRoot}>
              <Grid container spacing={3} style={{ justifyContent: "center" }}>
                <Grid item xs={12}>
                  <Paper className={classes.paper + " tripDetailsInfoPaper"}>
                    <Typography variant="h6">Trip Details</Typography>
                    {tripData && (
                      <TripDetailsForm
                        tab={props.tab}
                        styles={classes.button}
                        onChange={onChangeHandler}
                        addBreakPoint={addBreakPoint}
                        onBreakPointChange={onBreakPointChange}
                        removeBreakPoint={removeBreakPoint}
                        onAssetChange={onAssetChange}
                        onDateChange={onDateChange}
                        onStartDateChange={onStartDateChange}
                        state={tripData}
                        isNew={props.new}
                        isEditMode={isEditMode}
                      />
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <Grid item xs={12} sm={12} style={{ marginTop: "1rem" }}>
              {isEditMode ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.button + " editBtn"}
                    startIcon={<EditIcon />}
                    style={{ backgroundColor: "lightblue" }}
                    onClick={saveBtnOnClickHandler}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.button}
                    onClick={toggleEditMode}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.button}
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
