import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(3),
    justifyContent: "space-between",
  },
  green: {
    backgroundColor: "white",
    color: "green",
    border: "5px solid green",
    [theme.breakpoints.only("xs")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      fontSize: "25px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("sm")]: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      fontSize: "30px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("md")]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
      fontSize: "35px",
      fontWeight: "bold",
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      fontSize: "45px",
      fontWeight: "bold",
    },
  },
  orange: {
    backgroundColor: "white",
    color: "orange",
    border: "5px solid orange",
    [theme.breakpoints.only("xs")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      fontSize: "25px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("sm")]: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      fontSize: "30px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("md")]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
      fontSize: "35px",
      fontWeight: "bold",
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      fontSize: "45px",
      fontWeight: "bold",
    },
  },
  red: {
    backgroundColor: "white",
    color: "red",
    border: "5px solid red",
    [theme.breakpoints.only("xs")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      fontSize: "25px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("sm")]: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      fontSize: "30px",
      fontWeight: "bold",
    },
    [theme.breakpoints.only("md")]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
      fontSize: "35px",
      fontWeight: "bold",
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      fontSize: "45px",
      fontWeight: "bold",
    },
  },
}));

export default function DashboardCircles() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.green}>13</Avatar>
      <Avatar className={classes.orange}>10</Avatar>
      <Avatar className={classes.red}>09</Avatar>
    </div>
  );
}
