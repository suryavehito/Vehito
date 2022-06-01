import {
  Avatar, Button, Container,
  ThemeProvider,
  Typography
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
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addDriver, getDriverDetailById, updateDriver } from "../../api/driver.api";
import Footer from "../../components/footer/Footer";
import DriverDetailsForm from "../../components/form/DriverDetailsForm";
import Header from "../../components/header/Header";
import AvatarModal from "../../components/modal/AvatarModal";
import "./Driver.css";

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

export default function Driver(props) {
  let history = useHistory();

  let params = useParams();

  let driverId = params.driverId;

  if (!sessionStorage.getItem("isLoggedIn")) {
    history.push("/");
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(props.tab || 0);

  const [isNew, setIsNew] = React.useState(props.new || false);

  const [driverData, setDriverData] = React.useState({
    driverId: "",
    ownerUniqueId: "",
    fName: "",
    lName: "",
    gender: "",
    idType: "",
    idNumber: "",
    address: "",
    pincode: "",
    country: "",
    reference1: "",
    reference2: "",
    ref1Mobile: "",
    ref2Mobile: "",
    mobile: "",
    alternativeMobile: "",
    licenseNo: "",
    birthDate: 0,
    experience: 0,
    createdOn: 0,
    updatedOn: 0,
    addressUrl: "",
    licenseUrl: "",
    profileUrl: ""
  });

  const [edit, setEdit] = React.useState(props.editable || false);

  React.useEffect(() => {
    if (driverId && !isNew) {
      const response = getDriverDetailById(driverId);
      response.then(setDriverData);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveBtnOnClickHandler = () => {
    if (driverData.driverId) {
      const updateAssetResponse = updateDriver(driverData);
      updateAssetResponse.then((updAstRes) => {
        const response = getDriverDetailById(updAstRes.id);
        response.then(setDriverData);
        setEdit(false);
      });
    }
    else {
      const addAssetResponse = addDriver(driverData);
      addAssetResponse.then((addAstRes) => {

        const response = getDriverDetailById(addAstRes.id);
        response.then(setDriverData);
        setEdit(false);
      });
    }
    if(isNew) history.push("/vehicle/mydrivers");
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setDriverData({ ...driverData, vehicleImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const toggleEditMode = () => {
    setEdit(!edit);
  };


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(" on chagne " + name + value);
    setDriverData({ ...driverData, [name]: value });
  };

  const onDateChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(" on date chagne " + name + new Date(value).getTime());
    setDriverData({ ...driverData, [name]: new Date(value).getTime() });
  };

  const avatarOnClickHandler = () => {
    setDriverData({ ...driverData, avatarModal: true });
  };

  const submitOnClickHandler = () => {
    setDriverData({
      ...driverData,
      avatarModal: false,
      driverImage: sessionStorage.getItem("image"),
    });
  };

  const handleClose = () => {
    setDriverData({ ...driverData, avatarModal: false });
  };

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
                <Tab label="Driver Information" {...a11yProps(0)} />
              </Tabs>
            </AppBar>
          </ThemeProvider>
          <TabPanel value={value} index={0}>
            <div className={classes.gridRoot}>
              <Grid container spacing={3} style={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={8} md={6} lg={6}>
                  <Paper className={classes.paper + " uploadDriverImagePaper"}>
                    <Typography variant="h6">Upload Image</Typography>
                    <div className="avatarDiv">
                      <Avatar
                        onClick={avatarOnClickHandler}
                        alt="driver_image"
                        src={driverData.driverImage}
                        className={classes.large}
                      />
                    </div>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      className="driverImage"
                      id="driverImage"
                      type="file"
                      onChange={handleImageChange}
                      name="driverImage"
                      value=""
                    />
                    <label htmlFor="driverImage">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        {driverData.driverImage === "" || edit ? "Upload" : "Edit"}
                      </Button>
                    </label>

                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8} lg={6} md={6}>
                  <Paper className={classes.paper + " driverDetailsInfoPaper"}>
                    <Typography variant="h6">Driver Details</Typography>
                    {driverData && <DriverDetailsForm
                      tab={props.tab}
                      styles={classes.button}
                      isEditable={edit}
                      onChange={onChangeHandler}
                      onDateChange={onDateChangeHandler}
                      state={driverData}
                    />}
                  </Paper>
                </Grid>
              </Grid>
              <AvatarModal
                submitOnClickHandler={submitOnClickHandler}
                image={driverData.driverImage}
                handleClose={handleClose}
                open={driverData.avatarModal}
              />
            </div>
          </TabPanel>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <Grid item xs={12} sm={12} style={{ marginTop: "1rem" }}>
              {isNew ? 
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
               </> : 
                edit ?
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
                </> :
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.button}
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>
              }

            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
