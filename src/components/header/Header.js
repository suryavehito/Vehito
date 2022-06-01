import Button from "@material-ui/core/Button";
import vehitoLogo from "../../assets/images/vehitoLogo.png";
import "./Header.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import CustomModal from "../modal/CustomModal";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  btns: {
    textTransform: "capitalize",
  },
}));

export default function Header(props) {
  let history = useHistory();
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutBtnOnClickHandler = () => {
    setOpen(true);
  };

  const handleClick = (route) => () => {
    history.push(route);
  }

  const yesBtnClickHandler = () => {
    sessionStorage.clear();
    history.push("/");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mobileMenuId = "menu";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {props.showButtons === true && !sessionStorage.getItem("isLoggedIn") ? (
        <div>
          <MenuItem onClick={handleClick("/signup")}>
            <IconButton
              disableRipple={true}
              disableFocusRipple={true}
              color="inherit"
            >
              <LockIcon />
            </IconButton>
            <p>Signup</p>
          </MenuItem>
          <MenuItem onClick={handleClick("/login")}>
            <IconButton
              disableRipple={true}
              disableFocusRipple={true}
              color="inherit"
            >
              <LockOpenIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>{" "}
        </div>
      ) : (
        ""
      )}
      {props.showLogin === true && !sessionStorage.getItem("isLoggedIn") ? (
        <MenuItem onClick={handleClick("/login")}>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            color="inherit"
          >
            <LockOpenIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      ) : (
        ""
      )}
      {props.showSignup === true && !sessionStorage.getItem("isLoggedIn") ? (
        <MenuItem onClick={handleClick("/signup")}>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            color="inherit"
          >
            <LockIcon />
          </IconButton>
          <p>Signup</p>
        </MenuItem>
      ) : (
        ""
      )}
      {sessionStorage.getItem("isLoggedIn") ? (
        <div>
          <MenuItem onClick={handleClick("/vehicle/dashboard")}>
            <p>Dashboard</p>
          </MenuItem>
          <MenuItem onClick={handleClick("/vehicle/myassets")}>
            <p>My Assets</p>
          </MenuItem>
          <MenuItem onClick={handleClick("/vehicle/mydrivers")}>
            <p>My Driver</p>
          </MenuItem>
          <MenuItem onClick={handleClick("/trips")}>
            <p>Trips</p>
          </MenuItem>
          <MenuItem onClick={handleClick("/user/edit/details")}>
            <p>Settings</p>
          </MenuItem>
          <MenuItem onClick={logoutBtnOnClickHandler}>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        ""
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: "dimgray", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <img className="company-logo" src={vehitoLogo} alt="company_logo" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Vehito Controller
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.showButtons === true &&
              !sessionStorage.getItem("isLoggedIn") ? (
              <div>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/signup")}
                  color="inherit"
                >
                  Signup
                </Button>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/login")}
                  color="inherit"
                >
                  Login
                </Button>
              </div>
            ) : (
              ""
            )}
            {props.showSignup === true &&
              !sessionStorage.getItem("isLoggedIn") ? (
              <Button
                className={classes.btns}
                onClick={handleClick("/signup")}
                color="inherit"
              >
                Signup
              </Button>
            ) : (
              ""
            )}
            {props.showLogin === true &&
              !sessionStorage.getItem("isLoggedIn") ? (
              <Button
                className={classes.btns}
                onClick={handleClick("/login")}
                color="inherit"
              >
                Login
              </Button>
            ) : (
              ""
            )}
            {sessionStorage.getItem("isLoggedIn") ? (
              <div style={{ display: "flex" }}>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/vehicle/dashboard")}
                  color="inherit"
                >
                  Dashboard
                </Button>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/vehicle/myassets")}
                  color="inherit"
                >
                  My Assets
                </Button>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/vehicle/mydrivers")}
                  color="inherit"
                >
                  My Drivers
                </Button>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/trips")}
                  color="inherit"
                >
                 Trips
                </Button>
                <Button
                  className={classes.btns}
                  onClick={handleClick("/user/edit/details")}
                  color="inherit"
                >
                  Settings
                </Button>
                <Button
                  className={classes.btns}
                  onClick={logoutBtnOnClickHandler}
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <CustomModal
        message={"Are You sure Do you want to logout?"}
        open={open}
        handleClose={handleClose}
        yesBtnClick={yesBtnClickHandler}
        noBtnClick={handleClose}
      />
    </div>
  );
}
