import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Users from './pages/Users';
import Patients from './pages/Patients';
import Attendance from './pages/Attendance';
import Overview from './pages/Overview';
import Movements from './pages/Movements';
import NewUser from './pages/Users/NewUser';
import AttendanceListing from './pages/Attendance/AttendanceListing';
import NewPatient from './pages/Patients/NewPatient';
import NewAttendance from './pages/Attendance/NewAttendance';
import NewMovement from './pages/Movements/NewMovement';
import './App.css';
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/patients/new" component={NewPatient} />
        <PrivateRoute path="/patients" component={Patients} />
        <Route path="/users/new" component={NewUser} />
        <Route path="/users" component={Users} />
        <Route path="/attendance/new" component={NewAttendance} />
        <Route path="/attendance/listing" component={AttendanceListing} />
        <Route path="/attendance" component={Attendance} />
        <Route path="/overview" component={Overview} />
        <Route path="/movements/new" component={NewMovement} />
        <Route path="/movements" component={Movements} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
