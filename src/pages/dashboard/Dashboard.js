import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  ListItemText,
  Collapse,
  Typography,
  CardHeader,
  IconButton,
  Divider,
  CardActions,
  Button,
} from "@material-ui/core";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faTruck,
  faBus,
  faShuttleVan,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterListIcon from "@material-ui/icons/FilterList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Popover from "@material-ui/core/Popover";
import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import CustomSlider from "../../components/slider/CustomSlider";
import CustomTabs from "./CustomTabs";
import Badge from "@material-ui/core/Badge";
import {
  getAllAsset,
  getCurrentData,
  getLocations,
} from "../../api/assets.api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mapGrid: {
    marginTop: "1.5rem",
  },
  inputAdornment: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchBarDiv: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 0,
  },
  SettingsDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    minWidth: 275,
  },
  listItem: {
    "&:focus": {
      background: "lightGray",
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#585858",
    },
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Dashboard = () => {
  const [refreshCnt, setRefreshCnt] = useState(0);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [settings, setSettings] = useState([
    {
      name: "Show All Vehilces",
      shortName: "showAll",
      SettingsList: [],
    },
    {
      name: "Passenger",
      shortName: "passenger",
      SettingsList: [],
    },
    {
      name: "LCV",
      shortName: "lcv",
      SettingsList: [],
    },
    {
      name: "HCV",
      shortName: "hcv",
      SettingsList: [],
    },
  ]);

  const [data, setData] = useState({
    settings: [],
    value: "",
    lat: 28.6138954,
    lng: 77.2090057,
    location: "New Delhi",
    isOpenInfoWindow: false,
    vid: "",
    display: "none",
    vehicleDetails: null,
    expanded: false,
    status: "",
    SettingsList: [],
    anchorEl: null,
    running: false,
    stopped: false,
    faulty: false,
    batteryMaxValue: 36,
    batteryMinValue: 0,
    batteryMinRange: 0,
    batteryMaxRange: 36,
    fuelStatusMinValue: 0,
    fuelStatusMaxValue: 650,
    fuelStatusMinRange: 0,
    fuelStatusMaxRange: 650,
    oddometerMinValue: 0,
    oddometerMaxValue: 10000,
    oddometerMinRange: 0,
    oddometerMaxRange: 10000,
    battery: false,
    fuel: false,
    oddometer: false,
    shortName: "",
    selectedList: "",
  });

  const getVehicleDetails = () => {
    const allAssets = getAllAsset();
    allAssets
      .then((response) => {
        const tmpSettings = [...settings];
        tmpSettings[0].SettingsList = response;
        tmpSettings[1].SettingsList = response.filter(
          (res) => res.assetType === "Passenger"
        );
        tmpSettings[2].SettingsList = response.filter(
          (res) => res.assetType === "LCV"
        );
        tmpSettings[3].SettingsList = response.filter(
          (res) => res.assetType === "HCV"
        );
        setSettings(tmpSettings);
      })
      .catch(() => {
        setSettings([]);
      });
  };

  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("issuedToken")) {
      history.push("/");
    } else {
      getVehicleDetails();
    }
  }, []);

  const getReverseGeocodingData = (lat, lng) => {
    var latlng = new window.google.maps.LatLng(lat, lng);
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        return;
      }
      if (status === window.google.maps.GeocoderStatus.OK) {
        var address = results[0].formatted_address;
        setData({ ...data, location: address });
      }
    });
  };

  useEffect(() => {
    let intervalID = setTimeout(() => setRefreshCnt(refreshCnt + 1), 60000);
    return () => {
      clearTimeout(intervalID);
    };
  }, [refreshCnt]);

  useEffect(() => {
    if (isItemSelected && vehicle !== null) {
      getCurrentData(vehicle.assetId).then((response) => {
        if (response) {
          setData({
            ...data,
            lat: response.lat,
            lng: response.longitude,
            location: vehicle.currentLocation,
            vid: vehicle.assetId,
            display: "block",
            vehicleDetails: {
              ...vehicle,
              ...response,
            },
            status: response.status,
            assetId: vehicle.assetId,
            isMarkerShown: !!response.lat && !!response.longitude,
          });
        } else {
          setData({
            ...data,
            location: vehicle.currentLocation,
            vid: vehicle.assetId,
            display: "block",
            vehicleDetails: {},
            status: "",
            assetId: vehicle.assetId,
            isMarkerShown: !!response.lat && !!response.longitude,
          });
        }
      });
    }
  }, [refreshCnt]);

  const onListItemClickHandler = (vehicle) => {
    getReverseGeocodingData(vehicle.lat, vehicle.lng);
    getCurrentData(vehicle.assetId).then((response) => {
      if (response) {
        setData({
          ...data,
          lat: response.lat,
          lng: response.longitude,
          location: vehicle.currentLocation,
          vid: vehicle.assetId,
          display: "block",
          vehicleDetails: {
            ...vehicle,
            ...response,
          },
          status: response.status,
          assetId: vehicle.assetId,
          isMarkerShown: !!response.lat && !!response.longitude,
        });
      } else {
        setData({
          ...data,
          location: vehicle.currentLocation,
          vid: vehicle.assetId,
          display: "block",
          vehicleDetails: {},
          status: "",
          assetId: vehicle.assetId,
          isMarkerShown: !!response.lat && !!response.longitude,
        });
      }
    });
    setVehicle(vehicle);
    setIsItemSelected(true);
  };

  const closeInfoWindow = () => {
    setData({ ...data, ...data, isOpenInfoWindow: false });
  };

  const openInfoWindow = () => {
    if (data.display === "block") {
      setData({ ...data, display: "none" });
    }
    setData({ ...data, isOpenInfoWindow: true });
  };

  const onClose = () => {
    setData({ ...data, display: "none" });
  };

  const handleClose = () => {
    setData({ ...data, anchorEl: null });
  };

  const searchHandler = (e) => {
    let value = e.target.value;
    let SettingsArray = [];
    if (value === "") {
      return setData({ ...data, settings: SettingsArray });
    }
    settings[0].SettingsList.filter((vehicle) =>
      vehicle.vid.toLowerCase().includes(value) ||
      vehicle.vid.toUpperCase().includes(value) ||
      vehicle.status.toLowerCase().includes(value) ||
      vehicle.status.toUpperCase().includes(value)
        ? SettingsArray.push(vehicle)
        : ""
    );
    setData({ ...data, settings: SettingsArray });
  };

  const filterHandler = (e) => {
    setData({ ...data, anchorEl: e.currentTarget });
  };

  const handleClick = (vehicle) => {
    if (
      data.shortName !== vehicle.shortName &&
      data.shortName !== "" &&
      data.expanded
    ) {
      return setData({
        ...data,
        expanded: true,
        shortName: vehicle.shortName,
        SettingsList: vehicle.SettingsList,
      });
    }
    setData({
      ...data,
      SettingsList: vehicle.SettingsList,
      shortName: vehicle.shortName,
      expanded: !data.expanded,
      selectedList: vehicle.shortName,
    });
  };

  const sliderChange = (name) => (event, newValue) => {
    if (name === "battery") {
      setData({
        ...data,
        batteryMinRange: newValue[0],
        batteryMaxRange: newValue[1],
      });
    } else if (name === "fuel") {
      setData({
        ...data,
        fuelStatusMinRange: newValue[0],
        fuelStatusMaxRange: newValue[1],
      });
    } else {
      setData({
        ...data,
        oddometerMinRange: newValue[0],
        oddometerMaxRange: newValue[1],
      });
    }
  };

  const changeCommited = (name) => (event, newValue) => {
    let SettingsArray = [];
    if (name === "battery") {
      setData({
        ...data,
        batteryMinRange: newValue[0],
        batteryMaxRange: newValue[1],
        battery: true,
      });

      if (
        newValue[0] === data.batteryMinValue &&
        data.batteryMaxValue === newValue[1] &&
        data.fuelStatusMinRange === data.fuelStatusMinValue &&
        data.fuelStatusMaxRange === data.fuelStatusMaxValue &&
        data.oddometerMinRange === data.oddometerMinValue &&
        data.oddometerMaxRange === data.oddometerMaxValue &&
        !data.running &&
        !data.stopped &&
        !data.faulty
      ) {
        return setData({ ...data, settings: SettingsArray, oddometer: false });
      }

      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (
        data.running &&
        data.stopped &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (
        data.running &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.stopped && data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.stopped && data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.faulty && data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.battery && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.stopped && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "faulty" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.stopped && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.faulty && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "faulty" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.running && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.battery && data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.battery && data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }

      if (data.fuel && data.oddometer && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.oddometer) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.batteryMinRange < data.batteryMaxRange) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        setData({ ...data, settings: SettingsArray });
      }
    }

    if (name === "fuel") {
      setData({
        ...data,
        fuelStatusMinRange: newValue[0],
        fuelStatusMaxRange: newValue[1],
        fuel: true,
      });

      if (
        newValue[0] === data.fuelStatusMinValue &&
        data.fuelStatusMaxValue === newValue[1] &&
        data.batteryMinRange === data.batteryMinValue &&
        data.batteryMaxRange === data.batteryMaxValue &&
        data.oddometerMinRange === data.oddometerMinValue &&
        data.oddometerMaxRange === data.oddometerMaxValue &&
        !data.running &&
        !data.stopped &&
        !data.faulty
      ) {
        return setData({ ...data, settings: SettingsArray, oddometer: false });
      }

      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.faulty && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.faulty && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "faulty" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.oddometer) {
        data.settings.filter((vehicle) =>
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuelStatusMinRange < data.fuelStatusMaxRange) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        setData({ ...data, settings: SettingsArray });
      }
    }

    if (name === "oddometer") {
      setData({
        ...data,
        oddometerMinRange: newValue[0],
        oddometerMaxRange: newValue[1],
        oddometer: true,
      });

      if (
        newValue[0] === data.oddometerMinValue &&
        data.oddometerMaxValue === newValue[1] &&
        data.fuelStatusMinRange === data.fuelStatusMinValue &&
        data.fuelStatusMaxRange === data.fuelStatusMaxValue &&
        data.batteryMinRange === data.batteryMinValue &&
        data.batteryMaxRange === data.batteryMaxValue &&
        !data.running &&
        !data.stopped &&
        !data.faulty
      ) {
        return setData({ ...data, settings: SettingsArray, oddometer: false });
      }

      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.fuel
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.battery &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.faulty &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.faulty && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.stopped &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (
        data.running &&
        data.faulty &&
        data.battery &&
        data.fuel &&
        data.oddometer
      ) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.fuel && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.fuel && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.stopped && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.faulty && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty") &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.faulty && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          (vehicle.status.toLowerCase() === "faulty" ||
            vehicle.status.toLowerCase() === "stopped") &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer && data.fuel) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.battery && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.oddometer && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.running && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.faulty && data.battery) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.fuel && data.faulty) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "faulty" &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.fuel && data.oddometer) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.battery && data.fuel) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.running) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "running" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.stopped) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === "stopped" &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray });
      }
      if (data.battery) {
        data.settings.filter((vehicle) =>
          vehicle.battery >= data.batteryMinRange &&
          vehicle.battery <= data.batteryMaxRange &&
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.fuel) {
        data.settings.filter((vehicle) =>
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange &&
          vehicle.fuel >= data.fuelStatusMinRange &&
          vehicle.fuel <= data.fuelStatusMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({ ...data, settings: SettingsArray, oddometer: true });
      }
      if (data.oddometerMinRange < data.oddometerMaxRange) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.oddometer >= data.oddometerMinRange &&
          vehicle.oddometer <= data.oddometerMaxRange
            ? SettingsArray.push(vehicle)
            : ""
        );
        setData({ ...data, settings: SettingsArray, oddometer: true });
      }
    }
  };

  const onChange = (e) => {
    let SettingsArray = [];

    setData({
      ...data,
      [e.target.name]: e.target.value === "" ? "" : Number(e.target.value),
    });

    let name =
      e.target.name === "batteryMinRange" || e.target.name === "batteryMaxRange"
        ? "battery"
        : e.target.name === "fuelStatusMinRange" ||
          e.target.name === "fuelStatusMaxRange"
        ? "fuel"
        : "oddometer";

    if (data.running && data.stopped && data.faulty) {
      settings[0].SettingsList.filter((vehicle) =>
        (vehicle.status.toLowerCase() === "running" ||
          vehicle.status.toLowerCase() === "stopped" ||
          vehicle.status.toLowerCase() === "faulty") &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.running && data.stopped) {
      settings[0].SettingsList.filter((vehicle) =>
        (vehicle.status.toLowerCase() === "running" ||
          vehicle.status.toLowerCase() === "stopped") &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.running && data.faulty) {
      settings[0].SettingsList.filter((vehicle) =>
        (vehicle.status.toLowerCase() === "running" ||
          vehicle.status.toLowerCase() === "faulty") &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.stopped && data.faulty) {
      settings[0].SettingsList.filter((vehicle) =>
        (vehicle.status.toLowerCase() === "stopped" ||
          vehicle.status.toLowerCase() === "faulty") &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.running) {
      settings[0].SettingsList.filter((vehicle) =>
        vehicle.status.toLowerCase() === "running" &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.stopped) {
      settings[0].SettingsList.filter((vehicle) =>
        vehicle.status.toLowerCase() === "stopped" &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }
    if (data.faulty) {
      settings[0].SettingsList.filter((vehicle) =>
        vehicle.status.toLowerCase() === "faulty" &&
        vehicle.battery >= data.batteryMinRange &&
        vehicle.battery <= data.batteryMaxRange &&
        vehicle.fuel >= data.fuelStatusMinRange &&
        vehicle.fuel <= data.fuelStatusMaxRange &&
        vehicle.oddometer >= data.oddometerMinRange &&
        vehicle.oddometer <= data.oddometerMaxRange
          ? SettingsArray.push(vehicle)
          : ""
      );
      return setData({ ...data, settings: SettingsArray, [name]: true });
    }

    settings[0].SettingsList.filter((vehicle) =>
      vehicle.battery >= data.batteryMinRange &&
      vehicle.battery <= data.batteryMaxRange &&
      vehicle.fuel >= data.fuelStatusMinRange &&
      vehicle.fuel <= data.fuelStatusMaxRange &&
      vehicle.oddometer >= data.oddometerMinRange &&
      vehicle.oddometer <= data.oddometerMaxRange
        ? SettingsArray.push(vehicle)
        : ""
    );
    return setData({ ...data, settings: SettingsArray, [name]: true });
  };

  const handleChange = (e) => {
    let SettingsArray = [];

    if (data[e.target.name] === false) {
      if (data.settings.length === 0) {
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === e.target.name
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({
          ...data,
          [e.target.name]: !data[e.target.name],
          settings: SettingsArray,
        });
      } else {
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.running &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          data.running &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty" ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.running && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.stopped && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.stopped && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.faulty && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.faulty && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.running && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.stopped && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.stopped && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.faulty && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.faulty && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.running && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.stopped && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.stopped && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.faulty && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.faulty && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.fuel &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.battery && data.running && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.fuel && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.oddometer && data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === e.target.name ||
              vehicle.status.toLowerCase() === "running") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.battery <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.running && data.stopped && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "stopped"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.running && data.faulty && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "running" ||
            vehicle.status.toLowerCase() === "faulty"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.stopped && data.faulty && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "stopped" ||
            vehicle.status.toLowerCase() === "faulty"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.battery &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.fuel &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.running && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "running"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.running && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "running"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.stopped && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "stopped"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.stopped && e.target.name === "faulty") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "stopped"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.faulty && e.target.name === "stopped") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "faulty"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (data.faulty && e.target.name === "running") {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name ||
            vehicle.status.toLowerCase() === "faulty"
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        if (
          e.target.name === "running" ||
          e.target.name === "stopped" ||
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === e.target.name
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            [e.target.name]: !data[e.target.name],
            settings: SettingsArray,
          });
        }
        SettingsArray = data.settings;
        settings[0].SettingsList.filter((vehicle) =>
          vehicle.status.toLowerCase() === e.target.name
            ? SettingsArray.push(vehicle)
            : ""
        );
        return setData({
          ...data,
          [e.target.name]: !data[e.target.name],
          settings: SettingsArray,
        });
      }
    } else {
      if (data.running || data.stopped || data.faulty) {
        if (
          data.oddometerMinRange === data.oddometerMinValue &&
          data.oddometerMaxValue === data.oddometerMaxRange &&
          data.fuelStatusMinRange === data.fuelStatusMinValue &&
          data.fuelStatusMaxRange === data.fuelStatusMaxValue &&
          data.batteryMinRange === data.batteryMinValue &&
          data.batteryMaxRange === data.batteryMaxValue &&
          ((!data.running && !data.stopped) ||
            (!data.running && !data.faulty) ||
            (!data.stopped && !data.faulty)) &&
          (e.target.name === "running" ||
            e.target.name === "faulty" ||
            e.target.name === "stopped")
        ) {
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }

        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          (e.target.name === "stopped" || e.target.name === "running")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.oddometer &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.oddometer &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.running &&
          data.stopped &&
          e.target.name === "faulty"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "stopped") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.running &&
          data.faulty &&
          e.target.name === "stopped"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "running" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.stopped &&
          data.faulty &&
          e.target.name === "running"
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            (vehicle.status.toLowerCase() === "stopped" ||
              vehicle.status.toLowerCase() === "faulty") &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.fuel &&
          data.oddometer &&
          (e.target.name === "running" ||
            e.target.name === "stopped" ||
            e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.battery &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.fuel &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.running &&
          (e.target.name === "stopped" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "running" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.stopped &&
          (e.target.name === "running" || e.target.name === "faulty")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "stopped" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (
          data.oddometer &&
          data.faulty &&
          (e.target.name === "running" || e.target.name === "stopped")
        ) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.status.toLowerCase() === "faulty" &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.battery && data.fuel) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.battery && data.oddometer) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.fuel && data.oddometer) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange &&
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.battery) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.battery >= data.batteryMinRange &&
            vehicle.battery <= data.batteryMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.fuel) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.fuel >= data.fuelStatusMinRange &&
            vehicle.fuel <= data.fuelStatusMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
        if (data.oddometer) {
          settings[0].SettingsList.filter((vehicle) =>
            vehicle.oddometer >= data.oddometerMinRange &&
            vehicle.oddometer <= data.oddometerMaxRange
              ? SettingsArray.push(vehicle)
              : ""
          );
          return setData({
            ...data,
            settings: SettingsArray,
            [e.target.name]: !data[e.target.name],
          });
        }
      }
      data.settings.filter((vehicle) =>
        vehicle.status.toLowerCase() === e.target.name
          ? ""
          : SettingsArray.push(vehicle)
      );
      return setData({
        ...data,
        [e.target.name]: !data[e.target.name],
        settings: SettingsArray,
      });
    }
  };

  const resetAllClickHandler = () => {
    setData({
      ...data,
      running: false,
      stopped: false,
      faulty: false,
      battery: false,
      oddometer: false,
      fuel: false,
      batteryMinRange: data.batteryMinValue,
      batteryMaxRange: data.batteryMaxValue,
      fuelStatusMinRange: data.fuelStatusMinValue,
      fuelStatusMaxRange: data.fuelStatusMaxValue,
      oddometerMinRange: data.oddometerMinValue,
      oddometerMaxRange: data.oddometerMaxValue,
      settings: [],
    });
  };

  const classes = useStyles();
  const open = Boolean(data.anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <Header />
      <div className="main-div">
        {/* <Grid container spacing={2} justify="center">
                        <Grid item xs={12} sm={10} md={8} lg={6}>
                            <DashboardCircles />
                        </Grid>
            </Grid> */}
        <Grid
          container
          spacing={2}
          style={{ marginTop: 0, height: "46rem", maxHeight: "46rem" }}
        >
          <Grid
            item
            lg={3}
            md={6}
            sm={10}
            xs={12}
            style={{
              maxWidth: "18%",
              paddingTop: "2.9rem",
              paddingLeft: "0.5rem",
              paddingRight: 0,
              borderRight: "1px solid gray",
              height: "46rem",
              backgroundColor: "white",
            }}
          >
            <div className={classes.searchBarDiv}>
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="search-box-input" />
                <Input
                  id="search-box-input"
                  style={{ width: "92%" }}
                  endAdornment={
                    <InputAdornment
                      onClick={filterHandler}
                      className={classes.inputAdornment}
                      position="start"
                    >
                      <FilterListIcon />
                    </InputAdornment>
                  }
                  placeholder="Vehicle Id Or Status"
                  onChange={searchHandler}
                />
              </ThemeProvider>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={data.anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Card className={classes.root} variant="outlined">
                <CardHeader
                  action={
                    <IconButton onClick={handleClose} aria-label="close-filter">
                      <CloseIcon />
                    </IconButton>
                  }
                  title={<Typography variant="body1">Filter By</Typography>}
                />
                <Divider />
                <CardContent>
                  <Grid>
                    <Typography variant="body2">Status</Typography>
                    <div>
                      <FormControlLabel
                        style={{ width: "108.58px" }}
                        control={
                          <GreenCheckbox
                            checked={data.running}
                            onChange={handleChange}
                            name="running"
                          />
                        }
                        label="Running"
                      />
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={data.stopped}
                            onChange={handleChange}
                            name="stopped"
                          />
                        }
                        label="Stopped"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        style={{ width: "108.58px" }}
                        control={
                          <GreenCheckbox
                            checked={data.faulty}
                            onChange={handleChange}
                            name="faulty"
                          />
                        }
                        label="faulty"
                      />
                    </div>
                  </Grid>
                  <Divider />
                  <Grid>
                    <div style={{ paddingTop: "1rem" }}>
                      <CustomSlider
                        name="battery"
                        changeCommited={changeCommited("battery")}
                        sliderChange={sliderChange("battery")}
                        minRange={data.batteryMinRange}
                        maxRange={data.batteryMaxRange}
                        title="Battery Voltage"
                        min={data.batteryMinValue}
                        max={data.batteryMaxValue}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          value={data.batteryMinRange}
                          margin="dense"
                          onChange={onChange}
                          name="batteryMinRange"
                          inputProps={{
                            step: 4,
                            min: 0,
                            max: 36,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                        <Input
                          value={data.batteryMaxRange}
                          margin="dense"
                          onChange={onChange}
                          name="batteryMaxRange"
                          inputProps={{
                            step: 4,
                            min: 0,
                            max: 36,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ paddingTop: "1rem" }}>
                      <CustomSlider
                        title="Fuel Status (Ltrs)"
                        changeCommited={changeCommited("fuel")}
                        sliderChange={sliderChange("fuel")}
                        minRange={data.fuelStatusMinRange}
                        maxRange={data.fuelStatusMaxRange}
                        min={data.fuelStatusMinValue}
                        max={data.fuelStatusMaxValue}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          value={data.fuelStatusMinRange}
                          margin="dense"
                          onChange={onChange}
                          name="fuelStatusMinRange"
                          inputProps={{
                            step: 50,
                            min: 0,
                            max: 650,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                        <Input
                          value={data.fuelStatusMaxRange}
                          margin="dense"
                          onChange={onChange}
                          name="fuelStatusMaxRange"
                          inputProps={{
                            step: 50,
                            min: 0,
                            max: 650,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ paddingTop: "1rem" }}>
                      <CustomSlider
                        title="Oddometer (Km)"
                        changeCommited={changeCommited("oddometer")}
                        sliderChange={sliderChange("oddometer")}
                        minRange={data.oddometerMinRange}
                        maxRange={data.oddometerMaxRange}
                        min={data.oddometerMinValue}
                        max={data.oddometerMaxValue}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          value={data.oddometerMinRange}
                          margin="dense"
                          onChange={onChange}
                          name="oddometerMinRange"
                          inputProps={{
                            step: 1000,
                            min: 0,
                            max: 10000,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                        <Input
                          value={data.oddometerMaxRange}
                          margin="dense"
                          onChange={onChange}
                          name="oddometerMaxRange"
                          inputProps={{
                            step: 1000,
                            min: 0,
                            max: 10000,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>
                    </div>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions style={{ justifyContent: "center" }}>
                  <Button onClick={resetAllClickHandler} variant="outlined">
                    Reset All
                  </Button>
                </CardActions>
              </Card>
            </Popover>
            <div className={classes.SettingsDiv}>
              {data.settings.length === 0 ? (
                <List>
                  {settings.map((vehicle, index) => (
                    <div key={index}>
                      <ListItem
                        className={data.selectedList ? classes.listItem : ""}
                        button
                        onClick={() => handleClick(vehicle)}
                      >
                        <ListItemText>
                          {vehicle.name === "Passenger" ? (
                            <FontAwesomeIcon
                              style={{
                                marginRight: "0.5rem",
                                color: "green",
                              }}
                              icon={faShuttleVan}
                            />
                          ) : vehicle.name === "Light Weight" ? (
                            <FontAwesomeIcon
                              style={{ marginRight: "0.5rem", color: "blue" }}
                              icon={faCar}
                            />
                          ) : vehicle.name === "LCV" ? (
                            <FontAwesomeIcon
                              style={{
                                marginRight: "0.5rem",
                                color: "orange",
                              }}
                              icon={faTruck}
                            />
                          ) : vehicle.name === "HCV" ? (
                            <FontAwesomeIcon
                              style={{ marginRight: "0.5rem", color: "red" }}
                              icon={faBus}
                            />
                          ) : (
                            ""
                          )}
                          {vehicle.name}
                          <StyledBadge
                            style={{
                              verticalAlign: "top",
                              float: "right",
                              marginRight: "1rem",
                            }}
                            badgeContent={
                              vehicle.name === "Passenger"
                                ? settings[1].SettingsList.length
                                : vehicle.name === "LCV"
                                ? settings[2].SettingsList.length
                                : vehicle.name === "HCV"
                                ? settings[3].SettingsList.length
                                : settings[0].SettingsList.length
                            }
                            color="primary"
                          />
                        </ListItemText>
                        {data.shortName === vehicle.shortName &&
                        data.expanded ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        style={{ maxHeight: "24.5rem", overflow: "scroll" }}
                        in={
                          data.shortName === vehicle.shortName && data.expanded
                        }
                        timeout="auto"
                        unmountOnExit={true}
                      >
                        {data.SettingsList.map((vehicle) => (
                          <ListItem
                            key={vehicle.assetId}
                            button
                            onClick={() => onListItemClickHandler(vehicle)}
                            style={{ justifyContent: "space-between" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FontAwesomeIcon
                                style={{
                                  color: vehicle.status
                                    ? vehicle.status.toLowerCase() === "running"
                                      ? "green"
                                      : vehicle.status.toLowerCase() ===
                                        "stopped"
                                      ? "red"
                                      : "gray"
                                    : "gray",
                                }}
                                icon={faMinusCircle}
                              />
                              <p
                                style={{
                                  marginTop: 0,
                                  marginBottom: 0,
                                  marginLeft: "1rem",
                                }}
                              >
                                {vehicle.make} {vehicle.model}
                              </p>
                            </div>
                            <p style={{ marginTop: 0, marginBottom: 0 }}>
                              {vehicle.regNum}
                            </p>
                          </ListItem>
                        ))}
                      </Collapse>
                    </div>
                  ))}
                </List>
              ) : (
                <List style={{ maxHeight: "40rem", overflow: "scroll" }}>
                  {data.settings.map((vehicle) => (
                    <ListItem
                      key={vehicle.vid}
                      button
                      onClick={() => onListItemClickHandler(vehicle)}
                      style={{ justifyContent: "space-between" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon
                          style={{
                            color:
                              vehicle.status.toLowerCase() === "running"
                                ? "green"
                                : vehicle.status.toLowerCase() === "stopped"
                                ? "red"
                                : "gray",
                          }}
                          icon={faMinusCircle}
                        />
                        <p
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            marginLeft: "1rem",
                          }}
                        >
                          {vehicle.vid}
                        </p>
                      </div>
                      <p style={{ marginTop: 0, marginBottom: 0 }}>
                        {vehicle.speed} Km/H
                      </p>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </Grid>
          <Grid
            style={{ padding: 0, minWidth: "81.30%" }}
            item
            lg={9}
            md={6}
            sm={10}
            xs={12}
          >
            <CustomTabs
              display={data.display}
              vehicleDetails={data.vehicleDetails}
              onClose={onClose}
              closeInfoWindow={closeInfoWindow}
              selectedList={data.selectedList}
              openInfoWindow={openInfoWindow}
              isOpenInfoWindow={data.isOpenInfoWindow}
              isMarkerShown={data.isMarkerShown}
              lat={data.lat}
              lng={data.lng}
              status={data.status}
              location={data.location}
              shortName={data.shortName}
              assetId={data.assetId}
            />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
