import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";

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

export default function CustomModal(props) {
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
          <h2 id="modal-title">{props.message}</h2>
          <div className={classes.btnsDiv}>
            <Button
              variant="contained"
              color="secondary"
              onClick={props.yesBtnClick}
            >
              YES
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handleClose}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
