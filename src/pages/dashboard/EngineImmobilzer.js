import React, { Fragment, useState } from "react";
import "./CustomTabs.css";
import { green, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Switch } from "@material-ui/core";

const OnOffSwitch = withStyles({
    switchBase: {
        color: red[500],
        '& + $track': {
            backgroundColor: red[300],
        },
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[300],
        },
    },
    checked: {},
    track: {},
})(Switch);


function EngineImmobilizer(props) {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (event) => {
        setIsChecked(event.target.checked)
    };
    return (
        <Fragment>
            <div className="engine-immobilizer-container">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Off</Grid>
                    <Grid item>
                        <OnOffSwitch checked={isChecked} onChange={handleChange} />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>

            </div>
            <div  className="engine-immobilizer-container">Engine Immobilizer for KA51MM2964 at 11.00 AM On 15/04/2022</div>
        </Fragment>
    )
}


export default EngineImmobilizer;