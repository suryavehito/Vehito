import {
  Avatar, Button, Container,
  ThemeProvider,
  Typography
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addAsset, assignDriverToAsset, getAssetDetailById, getCurrentDriverMap, unAssignDriverFromAsset, updateAsset, updateDriverToAsset, uploadAssetImage } from "../../api/assets.api";
import { getAllUnassignedDriver, getDriverDetailById } from "../../api/driver.api";
import Footer from "../../components/footer/Footer";
import DriverDetailsForm from "../../components/form/DriverDetailsForm";
import OtherNotesForm from "../../components/form/OtherNotesForm";
import VehicleDetailsForm from "../../components/form/VehicleDetailsForm";
import VehicleInsuranceDetailsForm from "../../components/form/VehicleInsuranceDetails";
import VehicleMechanicalDetailsForm from "../../components/form/VehicleMechanicalDetailsForm";
import VehicleType from "../../components/form/VehicleType";
import Header from "../../components/header/Header";
import AvatarModal from "../../components/modal/AvatarModal";
import "./Asset.css";

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

export default function Asset(props) {
  let history = useHistory();

  let params = useParams();

  let vehicleId = params.vehicleId;

  if (!sessionStorage.getItem("isLoggedIn")) {
    history.push("/");
  }

  const lastStep = 1;
  const classes = useStyles();
  const [value, setValue] = React.useState(props.tab || 0);

  const [isNew, setIsNew] = React.useState(props.new || false);

  const [selectedDriver, setSelectedDriver] = React.useState(null);

  const [driverList, setDriverList] = React.useState([]);

  const [vehicleData, setVehicleData] = React.useState({
    assetId: "",
    regNum: "",
    assetType: "",
    make: "",
    model: "",
    imgUrl1: "",
    imgUrl2: "",
    imgUrl3: "",
    odoStart: "",
    insuranceComp: "",
    insuranceExp: "",
    engineNo: "",
    additionalInfo: "",
    transmission: "",
    imei: "",
    tankCapacity: 0,
    yom: "",
    createdOn: 0,
    modifiedOn: 0
  });

  const [vehicleImages, setVehicleImages] = React.useState([]);

  const [isDriverSet, setIsDriverSet] = React.useState(false);

  const [gINextBtn, setGINextBtn] = React.useState(false);

  const updateVehicleInformation = (vehicleDataResponse) => {
    setVehicleData(vehicleDataResponse);

    const tmpVehicleImages = [];

    if (vehicleDataResponse.imgUrl1) {
      tmpVehicleImages.push(vehicleDataResponse.imgUrl1);
    }
    if (vehicleDataResponse.imgUrl2) {
      tmpVehicleImages.push(vehicleDataResponse.imgUrl2);
    }
    if (vehicleDataResponse.imgUrl3) {
      tmpVehicleImages.push(vehicleDataResponse.imgUrl3);
    }
    setVehicleImages(tmpVehicleImages);
  }

  const getCurrentDriver = (assetId) => {
    if (assetId) {
      const driverMapResponse = getCurrentDriverMap(assetId);
      driverMapResponse.then((driverMapResp) => {
        setSelectedDriver(driverMapResp.driverInfo);
        setIsDriverSet(true);
      }).catch((e) => {
        setSelectedDriver(null);
      })
    }
  }

  React.useEffect(() => {
    if (vehicleId && !isNew) {
      const response = getAssetDetailById(vehicleId);
      response.then(updateVehicleInformation);
      getCurrentDriver(vehicleId);

    }

    const allDrivers = getAllUnassignedDriver();
    allDrivers.then((response) => {
      setDriverList(response);
    }).catch(() => {
      setDriverList([]);
    });
  }, []);

  const [edit, setEdit] = React.useState(isNew);

  const [editAssignDriver, setEditAssignDriver] = React.useState(isNew);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageChange = (event) => {
    if (vehicleImages.length < 3) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log('file name ' + file.name);
      const uploadResponse = uploadAssetImage(formData, vehicleData.regNum, file.name)
      uploadResponse.then((response) => {
        setVehicleImages([...vehicleImages, 'https://s3.ap-south-1.amazonaws.com/picassa.vehito.com/data/catalog/1013938.jpg']);
      });
      let temp = Array.from(vehicleImages);
      temp.push('https://s3.ap-south-1.amazonaws.com/picassa.vehito.com/data/catalog/1013938.jpg');
      setVehicleImages(temp);
    }
    console.log('vehicle len' + vehicleImages.length);
  };

  const toggleEditMode = () => {
    setEdit(!edit);
  };

  const toggleEditAssignDriver = () => {
    setEditAssignDriver(!editAssignDriver);
  };

  const saveAssignDriver = () => {
    if (selectedDriver) {
      if (isDriverSet) {
        updateDriverToAsset(vehicleData.assetId, selectedDriver.driverId).then((response) => {
          setEditAssignDriver(false);
        });
      }
      else {
        assignDriverToAsset(vehicleData.assetId, selectedDriver.driverId).then((response) => {
          setEditAssignDriver(false);
        });
      }
    }
    else {
      if (isDriverSet) {
        unAssignDriverFromAsset(vehicleData.assetId).then((response) => {
          setEditAssignDriver(false);
        });
      }
    }
  }

  const saveBtnOnClickHandler = () => {
    if (vehicleData.assetId) {
      const updateAssetResponse = updateAsset({
        ...vehicleData,
        imgUrl1: vehicleImages[0] || "",
        imgUrl2: vehicleImages[1] || "",
        imgUrl3: vehicleImages[2] || ""
      });
      updateAssetResponse.then((response) => {
        setEdit(false);
        updateVehicleInformation(response);
      });
    }
    else {
      const addAssetResponse = addAsset({
        ...vehicleData,
        imgUrl1: vehicleImages[0] || "",
        imgUrl2: vehicleImages[1] || "",
        imgUrl3: vehicleImages[2] || ""
      });
      addAssetResponse.then((response) => {
        setEdit(false);
        updateVehicleInformation(response);
      });
    }
  };

  const onChangeHandler = (event) => {
    setVehicleData({ ...vehicleData, [event.target.name]: event.target.value });
    if (value === 0) {
      generalInfoNextClick() ? setGINextBtn(true) : setGINextBtn(false)
    }
  };

  const onDriverChange = (event) => {
    const { value } = event.target;
    if (value) {
      if (value !== 'unassign') {
        const response = getDriverDetailById(value);
        response.then(setSelectedDriver);
      } else {
        setSelectedDriver(null);
      }
    } else {
      setSelectedDriver(null);
    }

  }

  const avatarOnClickHandler = () => {
    setVehicleData({ ...vehicleData, avatarModal: true });
  };

  const submitOnClickHandler = () => {
    setVehicleData({
      ...vehicleData,
      avatarModal: false,
      driverImage: sessionStorage.getItem("image"),
      imgUrl1: vehicleImages[0] || "",
      imgUrl2: vehicleImages[1] || "",
      imgUrl3: vehicleImages[2] || "",
    });
  };

  const generalInfoNextClick = () => {
    if (vehicleData.regNum && vehicleData.make && vehicleData.model && vehicleData.engineNo && vehicleData.odoStart &&
      vehicleData.imei && vehicleData.insuranceComp && vehicleData.insuranceExp &&
      vehicleData.transmission && vehicleData.assetType) {
      return true;
    } else return false;
  };

  const handleClose = () => {
    setVehicleData({ ...vehicleData, avatarModal: false });
  };

  const gotoNext = () => {
    setValue(value + 1);
  };

  const removeVehicleImage = (cur) => {
    console.log("remove vehicle " + cur + vehicleImages.length);
    if (vehicleImages.length === 1) setVehicleImages([]);
    else {

      let temp = vehicleImages.splice(cur, 1)
      setVehicleImages(temp);
    }
  }

  return (
    <Fragment>
      <Header />
      <Container className={classes.container}>
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="scrollable force tabs example"
              >
                <Tab label="General Information" {...a11yProps(0)} />
                <Tab label="Vehicle Images" disabled={!vehicleData.regNum} {...a11yProps(1)} />
                <Tab label="Assign Driver" disabled={!vehicleData.assetId} {...a11yProps(2)} />
                {vehicleId && <Tab label="Live Location" disabled={!vehicleData.assetId} {...a11yProps(3)} />}
                {vehicleId && <Tab label="Live Fault Codes" disabled={!vehicleData.assetId} {...a11yProps(4)} />}
              </Tabs>
            </AppBar>
          </ThemeProvider>
          <TabPanel value={value} index={0}>
            <div className={classes.gridRoot}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper + " vehicleInfoPaper"}>
                    <Typography variant="h6">
                      Specification Vehicle Primary Information
                    </Typography>
                    <VehicleDetailsForm
                      state={vehicleData}
                      details={vehicleData}
                      edit={edit}
                      onChange={onChangeHandler}
                    />
                  </Paper>
                  <Grid container spacing={3} style={{ marginTop: "1rem" }}>
                    <Grid item xs={12} sm={12}>
                      <Paper
                        className={classes.paper + " vehicleInsurencePaper"}
                      >
                        <Typography variant="h6">Insurance</Typography>
                        <VehicleInsuranceDetailsForm
                          state={vehicleData}
                          onChange={onChangeHandler}
                          details={vehicleData}
                          edit={edit}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Paper
                        className={classes.paper + " vehicleMechanicalPaper"}
                      >
                        <Typography variant="h6">Mechanical</Typography>
                        <VehicleMechanicalDetailsForm
                          state={vehicleData}
                          onChange={onChangeHandler}
                          edit={edit}
                          details={vehicleData}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.paper + " vehicleType"}>
                        <Typography variant="h6">Vehicle Type</Typography>
                        <VehicleType
                          details={vehicleData}
                          edit={edit}
                          onChange={onChangeHandler}
                          state={vehicleData}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.paper + " otherNotesPaper"}>
                        <Typography variant="h6">Other Notes</Typography>
                        <OtherNotesForm
                          state={vehicleData}
                          edit={edit}
                          onChange={onChangeHandler}
                          details={vehicleData}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper + " vehicleImagePaper"}>
                <Typography style={{ textAlign: "left" }} variant="h6">
                  Vehicle Image
                </Typography>
                <Typography style={{ textAlign: "left" }} variant="subtitle2">
                  Upload atleast 3 images
                </Typography>
                {(vehicleImages.length > 0) ? <GridList
                  cellHeight={160}
                  className={classes.gridList}
                  cols={3}
                >
                  {vehicleImages.map((veh, index) => {
                    return (
                      <GridListTile>
                        {edit && <IconButton
                          onClick={() => removeVehicleImage(index)}
                          className="removeBtn"
                          disableRipple={true}
                          disableFocusRipple={true}
                          color="inherit"
                        >
                          <DeleteIcon />
                        </IconButton>
                        }
                        <img
                          name="vehicleImage"
                          id="vehicleImage"
                          src={veh}
                          alt={"vehicle_Image"}
                        />

                      </GridListTile>
                    )
                  })}

                </GridList> :
                  <div className="avatarDiv">
                    <DriveEtaIcon
                      onClick={avatarOnClickHandler}
                      alt="driver_image"
                      src={vehicleData.driverImage}
                      className={classes.large}
                    />
                  </div>
                }
                {(vehicleImages.length < 3) && <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                    disabled={vehicleImages.length === 3 || !vehicleData.regNum}
                  />
                  {edit && <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      disabled={vehicleImages.length === 3 || !vehicleData.regNum}
                    >
                      Upload
                    </Button>
                  </label>}
                </div>}
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className={classes.gridRoot}>
              <Grid container spacing={3} style={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={8} md={6} lg={6}>
                  <Paper className={classes.paper + " uploadDriverImagePaper"}>
                    <Typography variant="h6">Driver Image</Typography>
                    <div className="avatarDiv">
                      <Avatar
                        alt="driver_image"
                        className={classes.large}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8} lg={6} md={6}>
                  <Paper className={classes.paper + " driverDetailsInfoPaper"}>
                    <Typography variant="h6">Driver Details</Typography>
                    <div className="row">
                      <div className="col-40">
                        <label className="labelText" htmlFor="driverFullName">
                          Full Name
                        </label>
                      </div>
                      <div className="col-60">
                        <select className="select" onChange={onDriverChange} disabled={!editAssignDriver}>
                          <option value="">Select Driver</option>
                          <option value="unassign">None</option>
                          {driverList.map(driver => <option value={driver.driverId}>{driver.fName} {driver.lName}</option>)}
                        </select>
                      </div>
                    </div>
                    {selectedDriver && <DriverDetailsForm
                      tab={props.tab}
                      styles={classes.button}
                      state={selectedDriver}
                    />}
                  </Paper>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {vehicleData.assetId && (editAssignDriver ?
                  <> <Button
                      variant="contained"
                      size="large"
                      className={classes.button + " editBtn"}
                      startIcon={<EditIcon />}
                      style={{ backgroundColor: "lightblue" }}
                      onClick={saveAssignDriver}
                    >
                      Save
                    </Button>
                     <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className={classes.button}
                      onClick={toggleEditAssignDriver}
                    >
                      Cancel
                    </Button>
                  </> :
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.button}
                    onClick={toggleEditAssignDriver}
                  >
                    Edit
                  </Button>)
                }
              </Grid>
              <AvatarModal
                submitOnClickHandler={submitOnClickHandler}
                image={vehicleData.driverImage}
                handleClose={handleClose}
                open={vehicleData.avatarModal}
              />
            </div>
          </TabPanel>
          {vehicleId && <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>}
          {vehicleId && <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>}
          {value <= lastStep && <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            
              {edit ?
                <>
                  {value < lastStep && <Button
                    variant="contained"
                    size="large"
                    className={classes.button + " editBtn"}
                    startIcon={<EditIcon />}
                    style={{ backgroundColor: "lightblue" }}
                    onClick={() => gotoNext()}
                  >
                    Next
                  </Button>}
                  {lastStep === value && <Button
                    variant="contained"
                    size="large"
                    className={classes.button + " editBtn"}
                    startIcon={<EditIcon />}
                    style={{ backgroundColor: "lightblue" }}
                    onClick={saveBtnOnClickHandler}
                    disabled={vehicleImages.length < 3}
                  >
                    Save
                  </Button>}
                  {vehicleData.assetId && <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.button}
                    onClick={toggleEditMode}
                  >
                    Cancel
                  </Button>}
                </> :
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.button}
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>}
           
          </Grid>}
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
