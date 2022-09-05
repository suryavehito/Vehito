import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import vehitoLogo from "../../assets/images/vehitoLogo.png";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import DeviceConfig from "./DeviceConfig";
import EditPreferences from "./EditPreference";
import EditProfile from "./EditProfile";

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
}));

export default function EditDetails() {
  const classes = useStyles();
  return (
    <>
      <Header showButtons={false} showLogin={false} showSignup={false} />
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} alt="logo" src={vehitoLogo} />
          <Typography component="h1" variant="h5">
            Edit Details
          </Typography>
          <Grid container>
            <Grid item sm={5} style={{ padding: "1rem" }}>
              <EditProfile />
            </Grid>
            <Grid item sm={2} style={{ padding: "1rem" }}>
              <div
                style={{
                  width: "2px",
                  backgroundColor: "grey",
                  height: "100%",
                  margin: "auto",
                }}
              ></div>
            </Grid>
            <Grid item sm={5} style={{ padding: "1rem" }}>
              <EditPreferences />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item sm={7} style={{ padding: "1rem" }}>
              <DeviceConfig />
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </>
  );
}
