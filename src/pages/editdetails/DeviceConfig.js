import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  OutlinedInput,
  Grid,
  Switch,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { Fragment, useEffect, useState } from "react";
import { editUserDetails, getUserDetailsByUserId } from "../../api/user.api";
import vehitoLogo from "../../assets/images/vehitoLogo.png";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import CustomizedSlider from "../../components/slider/CustomSliderOne";
import validator from "validator";

const ValidPort = RegExp(/^[0-9]{1,5}$/);

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 400,
    maxWidth: 400,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputRoot: {
    width: "100%",
  },
  gridRoot: {
    alignItems: "center",
  },
  label: {
    fontWeight: 400,
    fontSize: 16,
  },
  helperText: {
    color: "red",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function DeviceConfig() {
  const classes = useStyles();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const [values, setValues] = React.useState({
    apnStatus: false,
    adxlStatus: true,
    accelerationTh: 0,
    decelerationTh: 0,
    harshRightTh: 0,
    harshLeftTh: 0,
    port: "",
    ip: "",
  });

  const [errors, setErrors] = React.useState({
    portError: "",
    ipError: "",
  });

  useEffect(() => {}, []);

  const handleChange = (prop) => (event) => {
    if (prop === "port") {
      if (ValidPort.test(event.target.value) || event.target.value === "") {
        setErrors({ ...errors, portError: "" });
      } else {
        setErrors({ ...errors, portError: "Invalid Port" });
      }
    }
    if (prop === "ip") {
      if (
        validator.isIP(event.target.value, 4) ||
        validator.isIP(event.target.value, 6) ||
        event.target.value === ""
      ) {
        setErrors({ ...errors, ipError: "" });
      } else {
        setErrors({ ...errors, ipError: "Invalid Ip Address" });
      }
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.value === "" ? "" : Number(event.target.value),
    });
  };

  const renderActions = () => {
    return (
      <div
        className="btns-div"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </div>
    );
  };

  const sliderChange = () => {};
  const changeCommited = () => {};

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Device Configuration
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12}>
              <Grid container classes={{ root: classes.gridRoot }}>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>Server Host</span>
                </Grid>
                <Grid item sm={8} style={{ padding: "1rem" }}>
                  <OutlinedInput
                    placeholder="52.38.236.10"
                    onChange={handleChange("ip")}
                    classes={{ root: classes.inputRoot }}
                    error={Boolean(errors?.ipError)}
                    aria-describedby="outlined-weight-helper-text"
                  />
                  <FormHelperText className={classes.helperText}>
                    {errors?.ipError}
                  </FormHelperText>
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>Port</span>
                </Grid>
                <Grid item sm={8} style={{ padding: "1rem" }}>
                  <OutlinedInput
                    onChange={handleChange("port")}
                    placeholder="1028"
                    classes={{ root: classes.inputRoot }}
                    aria-describedby="outlined-weight-helper-text"
                    error={Boolean(errors?.portError)}
                  />
                  <FormHelperText className={classes.helperText}>
                    {errors?.portError}
                  </FormHelperText>
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>APN Service Provider</span>
                </Grid>
                <Grid item sm={8} style={{ padding: "1rem" }}>
                  <OutlinedInput
                    placeholder="airtelgprs.com"
                    classes={{ root: classes.inputRoot }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    APN Enable / Disable status
                  </span>
                </Grid>
                <Grid item sm={8} style={{ padding: "1rem" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        size="medium"
                        name="apnStatus"
                        checked={values.apnStatus}
                        onChange={() =>
                          setValues({
                            ...values,
                            apnStatus: !values?.apnStatus,
                          })
                        }
                        color="primary"
                      />
                    }
                    label={values?.apnStatus ? "Yes" : "No"}
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    Sudden Acceleration Threshold
                  </span>
                </Grid>
                <Grid item sm={7} style={{ padding: "1rem" }}>
                  <CustomizedSlider
                    value={values?.accelerationTh}
                    handleSliderChange={(event, newValue) =>
                      setValues({ ...values, accelerationTh: newValue })
                    }
                  />
                </Grid>
                <Grid item sm={1} style={{ padding: "1rem", paddingLeft: 0 }}>
                  <Input
                    value={values?.accelerationTh}
                    margin="dense"
                    name="accelerationTh"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 0.1,
                      min: 0.0,
                      max: 10.0,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    Sudden Deceleration Threshold/Harsh Breaking Threshold
                  </span>
                </Grid>
                <Grid item sm={7} style={{ padding: "1rem" }}>
                  <CustomizedSlider
                    value={values?.decelerationTh}
                    handleSliderChange={(event, newValue) =>
                      setValues({ ...values, decelerationTh: newValue })
                    }
                  />
                </Grid>
                <Grid item sm={1} style={{ padding: "1rem", paddingLeft: 0 }}>
                  <Input
                    value={values?.decelerationTh}
                    margin="dense"
                    name="decelerationTh"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 0.1,
                      min: 0.0,
                      max: 10.0,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    Harsh Right Turn Threshold
                  </span>
                </Grid>
                <Grid item sm={7} style={{ padding: "1rem" }}>
                  <CustomizedSlider
                    value={values?.harshRightTh}
                    handleSliderChange={(event, newValue) =>
                      setValues({ ...values, harshRightTh: newValue })
                    }
                  />
                </Grid>
                <Grid item sm={1} style={{ padding: "1rem", paddingLeft: 0 }}>
                  <Input
                    value={values?.harshRightTh}
                    margin="dense"
                    name="harshRightTh"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 0.1,
                      min: 0.0,
                      max: 10.0,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    Harsh Left Turn Threshold
                  </span>
                </Grid>
                <Grid item sm={7} style={{ padding: "1rem" }}>
                  <CustomizedSlider
                    value={values?.harshLeftTh}
                    handleSliderChange={(event, newValue) =>
                      setValues({ ...values, harshLeftTh: newValue })
                    }
                  />
                </Grid>
                <Grid item sm={1} style={{ padding: "1rem", paddingLeft: 0 }}>
                  <Input
                    value={values?.harshLeftTh}
                    margin="dense"
                    name="harshLeftTh"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 0.1,
                      min: 0.0,
                      max: 10.0,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
                <Grid item sm={4} style={{ padding: "1rem" }}>
                  <span className={classes.label}>
                    ADXL Enable/Disable status
                  </span>
                </Grid>
                <Grid item sm={8} style={{ padding: "1rem" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        size="medium"
                        name="adxlStatus"
                        checked={values.adxlStatus}
                        onChange={() =>
                          setValues({
                            ...values,
                            adxlStatus: !values?.adxlStatus,
                          })
                        }
                        color="primary"
                      />
                    }
                    label={values?.adxlStatus ? "Yes" : "No"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {renderActions()}
        </form>
      </div>
    </>
  );
}
