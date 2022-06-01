import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "96%",
    marginLeft: "0.3rem",
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function CustomSlider(props) {
  const classes = useStyles();

  const minRange = props.minRange === "" ? 0 : props.minRange;
  const maxRange = props.maxRange === "" ? 0 : props.maxRange;

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.title}
      </Typography>
      <Slider
        value={[minRange, maxRange]}
        onChange={props.sliderChange}
        onChangeCommitted={props.changeCommited}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={props.max}
        min={props.min}
      />
    </div>
  );
}
