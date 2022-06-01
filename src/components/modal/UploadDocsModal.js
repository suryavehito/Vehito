import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
  },
  btnsDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function UploadDocumentsModal(props) {
  const [state, setState] = React.useState({
    licenseUploadErrorMsg: "Upload File less than 2mb",
    licenseSuccessMsg: "",
    license: "",
    address: "",
    addressUploadErrorMsg: "Upload File less than 2mb",
    addressSuccessMsg: "",
  });

  const classes = useStyles();

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1000000;
    const allowedExtensions = /(\.jpg|\.pdf|\.png|\.jpeg)$/i;
    const filePath = event.target.value;
    if (fileSize <= 2 && allowedExtensions.exec(filePath)) {
      if (event.target.name === "license") {
        setState((prevState) => ({
          ...prevState,
          licenseUploadErrorMsg: "",
          licenseSuccessMsg: "Upload Success",
          license: file.name,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          addressUploadErrorMsg: "",
          addressSuccessMsg: "Upload Success",
          address: file.name,
        }));
      }
    } else {
      if (event.target.name === "license") {
        setState((prevState) => ({
          ...prevState,
          licenseUploadErrorMsg:
            "File Size > 2mb or Invalid Format Upload File in .pdf|.jpg|.png|.jpeg",
          licenseSuccessMsg: "",
          license: "",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          addressUploadErrorMsg:
            "File Size > 2mb or Invalid Format Upload File in .pdf|.jpg|.png|.jpeg",
          addressSuccessMsg: "",
          address: "",
        }));
      }
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 id="modal-title">Upload Documents</h2>
          <IconButton
            onClick={props.handleClose}
            style={{ height: "fit-content" }}
            size="small"
            aria-label="close"
            color="inherit"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={classes.btnsDiv}>
          <div
            style={{ textAlign: "left", marginTop: "1rem", display: "flex" }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              className="uploadDocs"
              id="license"
              type="file"
              onChange={handleUploadChange}
              name="license"
              required
            />
            <label htmlFor="license">
              <Button
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                Upload License
              </Button>
              <div>
                {state.licenseUploadErrorMsg !== "" ? (
                  <FormHelperText>{state.licenseUploadErrorMsg}</FormHelperText>
                ) : (
                  ""
                )}
                {state.licenseSuccessMsg !== "" ? (
                  <FormHelperText style={{ marginTop: "0.5rem" }}>
                    {state.licenseSuccessMsg}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </div>
            </label>
            <div style={{ margin: "0px 0.5rem", padding: "0.25rem" }}>
              {state.license !== "" ? (
                <FormHelperText>{state.license}</FormHelperText>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            style={{ textAlign: "left", marginTop: "1rem", display: "flex" }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              className="uploadDocs"
              id="address"
              type="file"
              onChange={handleUploadChange}
              name="address"
            />
            <label htmlFor="address">
              <Button
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                Upload Address
              </Button>
              <div>
                {state.addressUploadErrorMsg !== "" ? (
                  <FormHelperText>{state.addressUploadErrorMsg}</FormHelperText>
                ) : (
                  ""
                )}
                {state.addressSuccessMsg !== "" ? (
                  <FormHelperText style={{ marginTop: "0.5rem" }}>
                    {state.addressSuccessMsg}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </div>
            </label>
            <div style={{ margin: "0px 0.5rem", padding: "0.25rem" }}>
              {state.address !== "" ? (
                <FormHelperText>{state.address}</FormHelperText>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Button
            onClick={props.submitOnClickHandler}
            disabled={!state.license}
            variant="contained"
            color="primary"
            size="small"
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
