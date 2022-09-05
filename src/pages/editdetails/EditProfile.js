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

const ValidEmailRegex = RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
const ValidZipCodeRegex = RegExp(/^[A-Za-z0-9]{5,6}$/);
const ValidPasswordRegex = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/
);
export const ValidMobileNoRegex = RegExp(/^(\+\d{1,3})?\d{10}$/);

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
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
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
export default function EditProfile() {
  const classes = useStyles();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    email: "",
    organizationName: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    addressLine: "",
    mobileNo: "",
  });

  const [isDisabled, setIsDisabled] = React.useState(true);

  const [errors, setErrors] = React.useState({
    editDetailsPasswordErrorMsg: "",
    editDetailsEmailErrorMsg: "",
    editDetailsPostalCodeErrorMsg: "",
    editDetailsMobileNoErrorMsg: "",
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    let userDetails = getUserDetailsByUserId(userId);
    userDetails
      .then((response) => {
        setValues({
          password: response.password,
          email: response.email,
          organizationName: response.orgName,
          city: response.city,
          state: response.state,
          country: response.country,
          postalCode: response.pincode,
          addressLine: response.address,
          mobileNo: response.mobile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    switch (id) {
      case "email":
        setErrors({
          ...errors,
          editDetailsEmailErrorMsg: ValidEmailRegex.test(value)
            ? ""
            : "Invalid Email",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          editDetailsPasswordErrorMsg: ValidPasswordRegex.test(value)
            ? ""
            : "Password Should Contain atleast one uppercase letter, one lowercase letter, one digit and one special character and must be 8 to 20 characters",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          editDetailsConfirmPasswordErrorMsg:
            values.password === value
              ? ""
              : "Password and Confirm Password Should Match.",
        });
        break;
      case "postalCode":
        setErrors({
          ...errors,
          editDetailsPostalCodeErrorMsg: ValidZipCodeRegex.test(value)
            ? ""
            : "Invalid Postal Code",
        });
        break;
      case "mobileNo":
        setErrors({
          ...errors,
          editDetailsMobileNoErrorMsg: ValidMobileNoRegex.test(value)
            ? ""
            : "Invalid Mobile Number",
        });
        break;
      default:
        break;
    }
    setValues({ ...values, [id]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const toggleEditMode = (event) => {
    event.preventDefault();
    setIsDisabled(!isDisabled);
  };

  const saveDetailsClickHandler = (event) => {
    event.preventDefault();
    let updatedDetails = {
      userId: sessionStorage.getItem("userId"),
      email: values.email,
      password: values.password,
      orgName: values.organizationName,
      address: values.addressLine,
      country: values.country,
      state: values.state,
      city: values.city,
      pincode: values.postalCode,
      mobile: values.mobileNo,
    };
    let updateDetailsResponse = editUserDetails(updatedDetails);
    updateDetailsResponse
      .then((response) => {
        setIsDisabled(true);
        setShowSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderActions = () => {
    return (
      <div
        className="btns-div"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {isDisabled ? (
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={toggleEditMode}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveDetailsClickHandler}
            >
              Update
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={toggleEditMode}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        <form className={classes.form} noValidate>
          {renderActions()}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled={isDisabled}
            onChange={handleChange}
            value={values.email}
          />
          {errors.editDetailsEmailErrorMsg !== "" ? (
            <FormHelperText>
              <span style={{ color: "red" }} className="red">
                {errors.editDetailsEmailErrorMsg}
              </span>
            </FormHelperText>
          ) : (
            ""
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.password}
            name="password"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            id="password"
            disabled={isDisabled}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("showPassword")}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.editDetailsPasswordErrorMsg !== "" ? (
            <FormHelperText>
              <span style={{ color: "red" }} className="red">
                {errors.editDetailsPasswordErrorMsg}
              </span>
            </FormHelperText>
          ) : (
            ""
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.organizationName}
            name="organizationName"
            label="Organization Name"
            type="text"
            id="organizationName"
            disabled={isDisabled}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.addressLine}
            name="addressLine"
            label="Address Line"
            type="text"
            id="addressLine"
            disabled={isDisabled}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.country}
            name="country"
            label="Country"
            type="text"
            id="country"
            disabled={isDisabled}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="state"
            value={values.state}
            label="State"
            type="text"
            id="state"
            disabled={isDisabled}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            value={values.city}
            label="City"
            type="text"
            id="city"
            disabled={isDisabled}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.postalCode}
            name="postalCode"
            label="Postal Code"
            type="text"
            id="postalCode"
            disabled={isDisabled}
            onChange={handleChange}
          />
          {errors.editDetailsPostalCodeErrorMsg !== "" ? (
            <FormHelperText>
              <span style={{ color: "red" }} className="red">
                {errors.editDetailsPostalCodeErrorMsg}
              </span>
            </FormHelperText>
          ) : (
            ""
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.mobileNo}
            name="mobileNo"
            label="Mobile Number"
            type="text"
            id="mobileNo"
            disabled={isDisabled}
            onChange={handleChange}
          />
          {errors.editDetailsMobileNoErrorMsg !== "" ? (
            <FormHelperText>
              <span style={{ color: "red" }} className="red">
                {errors.editDetailsMobileNoErrorMsg}
              </span>
            </FormHelperText>
          ) : (
            ""
          )}
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleSnackbarClose}
          open={showSnackbar}
          autoHideDuration={2000}
          message="Updated Successfully"
          action={
            <Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          }
        ></Snackbar>
      </div>
    </>
  );
}
