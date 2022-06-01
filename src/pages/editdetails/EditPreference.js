import { Checkbox, FormControlLabel, FormGroup, Grid, InputAdornment, OutlinedInput, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import React, { Fragment, useEffect, useState } from "react";
import { updatePreferences } from "../../api/user.api";

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
        display: 'flex',
        flexWrap: 'wrap',
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
export default function EditPreference() {
    const classes = useStyles();
    const [showSnackbar, setShowSnackbar] = useState(false);

    const alertsList = [
        {
            label: 'Speed Limit',
            hasValue: true,
            valueLabel: 'KM/H',
            defaultValue: 80,
            valueKey: "speedLimit",
            key: 'speedLimitAlert'
        },
        {
            label: 'Fuel Level Limit',
            hasValue: true,
            valueLabel: '%',
            defaultValue: 30,
            valueKey: "fuelLevelLimit",
            key: 'fuelLevelAlert'
        },
        {
            label: 'Idle Time Limit',
            hasValue: true,
            valueLabel: 'Hours',
            defaultValue: 2,
            valueKey: "idleTimeLimit",
            key: 'idleTimeAlert'
        },
        {
            label: 'Fuel Cost',
            hasValue: true,
            valueLabel: 'INR',
            defaultValue: 95,
            valueKey: "fuelCost",
            key: 'fuelCostAlert'
        },
        {
            label: 'Battery Voltage Alert',
            hasValue: false,
            key: 'batteryVoltageAlert'
        },
        {
            label: 'Harsh Break Alert',
            hasValue: false,
            key: 'harshBreakAlert'
        },
        {
            label: 'Sudden Accelerate Alert',
            hasValue: false,
            key: 'suddenAccelerateAlert'
        },
        {
            label: 'Engine Overload Alert',
            hasValue: false,
            key: 'engineOverloadAlert'
        },
        {
            label: 'Rash Turn Alert',
            hasValue: false,
            key: 'rashTurnAlert'
        }];

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    }

    const [values, setValues] = React.useState({
        speedLimit: 80,
        fuelLevelLimit: 30,
        idleTimeLimit: 2,
        fuelCost: 95,
        speedLimitAlert: true,
        fuelLevelAlert: true,
        idleTimeAlert: true,
        batteryVoltageAlert: false,
        harshBreakAlert: false,
        suddenAccelerateAlert: false,
        engineOverloadAlert: false,
        rashTurnAlert: false,
        fuelCostAlert: true
    });

    const [isDisabled, setIsDisabled] = React.useState(true);

    const saveDetailsClickHandler = (event) => {
        event.preventDefault();
        let updateDetailsResponse = updatePreferences(values);
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
        return (<div
            className="btns-div"
            style={{ display: "flex", justifyContent: "space-evenly" }}
        >
            {isDisabled ? <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={toggleEditMode}
            >
                Edit
            </Button> : <>
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
            </>}

        </div>);
    }

    const handleAlertChange = (key) => (event) => {
        setValues({ ...values, [key]: event.target.checked });
    };

    const toggleEditMode = (event) => {
        event.preventDefault();
        setIsDisabled(!isDisabled);
    };


    return (
        <>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Preferences
                </Typography>

                <form className={classes.form} noValidate>
                    {renderActions()}
                    <FormGroup>
                        {alertsList.map(alrt => {
                            return (<Grid container>
                                <Grid item sm={alrt.hasValue && values[alrt.key] ? 8 : 12} style={{ padding: "1rem" }}>
                                    <FormControlLabel
                                        label={alrt.label}
                                        control={<Checkbox
                                            checked={values[alrt.key]}
                                            onChange={handleAlertChange(alrt.key)}
                                            disabled={isDisabled}
                                        />}
                                    />
                                </Grid>
                                {alrt.hasValue && values[alrt.key] && <Grid item sm={4} style={{ padding: "1rem" }}>
                                    <OutlinedInput
                                        id={`${alrt.key}-value`}
                                        value={values[alrt.valueKey]}
                                        endAdornment={<InputAdornment position="end">{alrt.valueLabel}</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        disabled={isDisabled}
                                    />
                                </Grid>}
                            </Grid>);
                        })}
                    </FormGroup>
                </form>

                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                    onClose={handleSnackbarClose}
                    open={showSnackbar}
                    autoHideDuration={2000}
                    message="Updated Successfully"
                    action={
                        <Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Fragment>
                    }
                ></Snackbar>
            </div>
        </>
    );
}
