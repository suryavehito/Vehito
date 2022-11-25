import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Button, Grid, Typography } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { getDriverIdImage, getLicenseImage } from "../../api/driver.api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%",
  },
}));

export default function ViewDocumentsModal({ open, handleClose, driverId }) {
  const classes = useStyles();

  const [licenseData, setLicenseData] = useState(null);
  const [addressData, setAddressData] = useState(null);

  useEffect(() => {
    if (driverId && driverId !== undefined && open) {
      const getLicenseResponse = getLicenseImage(driverId).then((res) => {
        if (res) {
          setLicenseData(`data:image/png;base64,${res}`);
        }
      });
    }
    if (driverId && driverId !== undefined && open) {
      const getLicenseResponse = getDriverIdImage(driverId).then((res) => {
        if (res) {
          setAddressData(`data:image/png;base64,${res}`);
        }
      });
    }
  }, [driverId, open]);

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 id="modal-title">View Documents</h2>
              <IconButton
                onClick={handleClose}
                style={{ height: "fit-content" }}
                size="small"
                aria-label="close"
                color="inherit"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <Grid container spacing={6}>
              {licenseData !== null && (
                <Grid item xs={6}>
                  <Typography variant="subtitle1">License Documents</Typography>
                  <img
                    style={{ width: "100%" }}
                    alt="license docs"
                    src={`${licenseData}`}
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <Typography variant="subtitle1">Address Documents</Typography>
                <img
                  style={{ width: "100%" }}
                  alt="license docs"
                  src={`${addressData}`}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Grid>
    </Grid>
  );
}
