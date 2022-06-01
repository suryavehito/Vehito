import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Filter from "../filter/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btnGrid: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "14vw",
      marginTop: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "12.5vw",
      marginTop: "1rem",
    },
  },
}));

export default function CustomFilterMenu(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container justify="flex-end">
        {props.anchorEl === null ? (
          <Grid
            item
            lg={4}
            xs={4}
            sm={12}
            style={{
              marginRight: "1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Typography style={{ margin: "auto 0px" }}>Filter</Typography>
            <IconButton
              aria-controls="fade-menu"
              onClick={props.handleClick}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <FilterListIcon />
            </IconButton>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            lg={10}
            style={{ marginTop: "1rem" }}
          >
            <Filter value={props.value} onTagsChange={props.onTagsChange} searchItem={props.searchItem}/>
            <Grid item className={classes.btnGrid}>
              <Button
                type="submit"
                onClick={props.onSubmitBtnClickHandler}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                style={{ marginLeft: "1rem" }}
                onClick={props.handleClose}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
}
