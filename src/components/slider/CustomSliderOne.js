import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#3f51b5",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider({ value, handleSliderChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrettoSlider
        value={typeof value === "number" ? value : 0}
        valueLabelDisplay="auto"
        max={10.0}
        step={0.1}
        min={0.0}
        aria-label="input-slider"
        onChange={handleSliderChange}
      />
    </div>
  );
}
