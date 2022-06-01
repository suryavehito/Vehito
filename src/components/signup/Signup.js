import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import vehitoLogo from "../../assets/images/vehitoLogo.png";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { signup } from "../../api/user.api";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Country, State, City } from "country-state-city";
import csc from "country-state-city";

const ValidEmailRegex = RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
const ValidZipCodeRegex = RegExp(/^[A-Za-z0-9]{5,6}$/);
const ValidPasswordRegex = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/
);
export const ValidMobileNoRegex = RegExp(/^(\+\d{1,3})?\d{10}$/);

const useStyles = makeStyles((theme) => ({
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
  autoComplete: {
    margin: "1.5rem 0px",
  },
}));

export default function Signup() {
  const classes = useStyles();
  let history = useHistory();
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

  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const [errors, setErrors] = React.useState({
    signupPasswordErrorMsg: "",
    signupEmailErrorMsg: "",
    signupPostalCodeErrorMsg: "",
    signupMobileNoErrorMsg: "",
  });

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    switch (id) {
      case "email":
        setErrors({
          ...errors,
          signupEmailErrorMsg: ValidEmailRegex.test(value)
            ? ""
            : "Invalid Email",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          signupPasswordErrorMsg: ValidPasswordRegex.test(value)
            ? ""
            : "Password Should Contain atleast one uppercase letter, one lowercase letter, one digit and one special character and must be 8 to 20 characters",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          signupConfirmPasswordErrorMsg:
            values.password === value
              ? ""
              : "Password and Confirm Password Should Match.",
        });
        break;
      case "postalCode":
        setErrors({
          ...errors,
          signupPostalCodeErrorMsg: ValidZipCodeRegex.test(value)
            ? ""
            : "Invalid Postal Code",
        });
        break;
      case "mobileNo":
        setErrors({
          ...errors,
          signupMobileNoErrorMsg: ValidMobileNoRegex.test(value)
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

  const signupClickHandler = (event) => {
    event.preventDefault();
    let signupDetails = {
      userId: "1",
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

    const signupResponse = signup(signupDetails);
    signupResponse.then((res) => {
      if (res?.id && res?.id !== null) {
        history.push("/login");
      }
    });
  };

  return (
    <div>
      <Header showButtons={false} showLogin={true} showSignup={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} alt="logo" src={vehitoLogo} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            {errors.signupEmailErrorMsg !== "" ? (
              <FormHelperText>
                <span style={{ color: "red" }} className="red">
                  {errors.signupEmailErrorMsg}
                </span>
              </FormHelperText>
            ) : (
              ""
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              size="small"
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              id="password"
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
            {errors.signupPasswordErrorMsg !== "" ? (
              <FormHelperText>
                <span style={{ color: "red" }} className="red">
                  {errors.signupPasswordErrorMsg}
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
              size="small"
              name="organizationName"
              label="Organization Name"
              type="text"
              id="organizationName"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              name="addressLine"
              label="Address Line"
              type="text"
              id="addressLine"
              onChange={handleChange}
            />
            <Autocomplete
              classes={{ root: classes.autoComplete }}
              name="country"
              id="country"
              options={Country.getAllCountries() ?? null}
              getOptionLabel={(option) => (option?.name ? option?.name : "")}
              type="text"
              size="small"
              value={country}
              onChange={(evt, value) => {
                setCountry(value);
                setValues({ ...values, country: value?.name });
                setStates(State.getStatesOfCountry(value?.isoCode));
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  size="small"
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
            <Autocomplete
              name="state"
              classes={{ root: classes.autoComplete }}
              id="state"
              disabled={country === null}
              options={states || []}
              getOptionLabel={(option) => (option?.name ? option?.name : "")}
              type="text"
              size="small"
              value={state}
              onChange={(evt, value) => {
                setState(value);
                setValues({ ...values, state: value?.name });
                setCities(
                  City.getCitiesOfState(value?.countryCode, value?.isoCode)
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Choose a state"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
            <Autocomplete
              name="city"
              classes={{ root: classes.autoComplete }}
              id="city"
              disabled={state === null}
              options={cities || []}
              getOptionLabel={(option) => (option?.name ? option?.name : "")}
              type="text"
              size="small"
              value={city}
              onChange={(evt, value) => {
                setCity(value);
                setValues({ ...values, city: value?.name });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose a city"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              name="postalCode"
              label="Postal Code"
              type="text"
              id="postalCode"
              onChange={handleChange}
            />
            {errors.signupPostalCodeErrorMsg !== "" ? (
              <FormHelperText>
                <span style={{ color: "red" }} className="red">
                  {errors.signupPostalCodeErrorMsg}
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
              size="small"
              name="mobileNo"
              label="Mobile Number"
              type="text"
              id="mobileNo"
              onChange={handleChange}
            />
            {errors.signupMobileNoErrorMsg !== "" ? (
              <FormHelperText>
                <span style={{ color: "red" }} className="red">
                  {errors.signupMobileNoErrorMsg}
                </span>
              </FormHelperText>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                !values.email ||
                !values.addressLine ||
                !values.password ||
                !values.mobileNo ||
                !values.organizationName ||
                !values.country ||
                !values.state ||
                !values.city ||
                !values.postalCode
              }
              onClick={signupClickHandler}
            >
              Sign Up
            </Button>
            <Grid container style={{ marginBottom: "1rem" }}>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
