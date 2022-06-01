import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Asset from "./pages/asset/Asset";
import Dashboard from "./pages/dashboard/Dashboard";
import DeepDive from "./pages/deepdive/DeepDive";
import Details from "./pages/details/Details";
import Driver from "./pages/driver/Driver";
import DriverDetails from "./pages/driverdetails/DriverDetails";
import EditDetails from "./pages/editdetails/EditDetails";
import Home from "./pages/homepage/Home";
import MyAssets from "./pages/myassets/MyAssets";
import MyDrivers from "./pages/mydrivers/MyDrivers";
import Trip from "./pages/trips/trip/Trip";
import Trips from "./pages/trips/Trips";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/vehicle/details" component={Details} />
        <Route
          exact
          path="/vehicle/myassets/new"
          component={() => <Asset tab={0} new={true} />}
        />
        <Route exact path="/vehicle/myassets" component={MyAssets} />
        <Route exact path="/vehicle/myassets/:vehicleId" component={() => <Asset />} />
        <Route exact path="/vehicle/dashboard" component={Dashboard} />
        <Route exact path="/view/driver/details" component={DriverDetails} />
        <Route exact path="/vehicle/mydrivers" component={MyDrivers} />
        <Route exact path="/driver/mydrivers/new" component={() => <Driver editable={true} new={true} />} />
        <Route exact path="/driver/mydrivers/:driverId" component={() => <Driver editable={false} />} />

        <Route exact path="/trips" component={Trips} />
        <Route exact path="/trips/new" component={() => <Trip new={true} />} />
        <Route exact path="/trips/:tripId" component={() => <Trip new={false}/>} />

        <Route
          exact
          path="/view/driver/details/:id"
          render={(props) => <Asset {...props} tab={2} />}
        />
        <Route
          exact
          path="/vehicle/:assetId/deepDive/:imei/:duration/:issuedToken"
          component={DeepDive}
        />
        <Route exact path="/user/edit/details" component={EditDetails} />
      </Switch>
    </div>
  );
}

export default App;
