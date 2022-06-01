/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
  },
  autocomplete: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
  },
}));

export default function Filter(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {props.searchItem === "Assets" && <Grid item lg={4} xs={12}>
        <Autocomplete
          className={classes.autocomplete}
          multiple
          value={props.value}
          onChange={props.onTagsChange}
          id="tags-standard"
          options={vehicleType}
          defaultValue={props.value}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Filter Vehicle"
              placeholder="Vehicle Type"
            />
          )}
        />
      </Grid>}
    </Grid>
  );
}

const vehicleType = [
  { title: "Commercial" },
  { title: "Non Commercial" },
  { title: "Light Duty" },
  { title: "Heavy Duty" },
];
