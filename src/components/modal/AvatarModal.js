import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import ImageCropper from "../imagecrop/ImageCropper";

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
    display: "flex",
    flexDirection: "column",
  },
}));

export default function AvatarModal(props) {
  const classes = useStyles();

  return (
    <div>
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
          <h2 id="modal-title">
            {props.image === "" ? "Upload Image To Crop" : "Crop Image"}
          </h2>
          {props.image !== "" ? <ImageCropper src={props.image} /> : ""}
          {props.image !== "" ? (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <Button
                onClick={props.submitOnClickHandler}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
}
