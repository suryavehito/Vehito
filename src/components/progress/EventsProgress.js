import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";


export default function EventsProgress(props) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      width: "90%",
      height: 10,
      margin: '0px 5%'
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: props.color,
    },
  }))(LinearProgress);
  return <BorderLinearProgress variant="determinate" value={props.value} />;
}
