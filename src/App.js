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
import NewEvaluation from './pages/Patients/NewEvaluation';

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
        <PrivateRoute path="/evaluation/new" component={NewEvaluation} />
        <PrivateRoute path="/patients/new" component={NewPatient} />
        <PrivateRoute path="/patients" component={Patients} />
        <PrivateRoute path="/users/new" component={NewUser} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/attendance/new" component={NewAttendance} />
        <PrivateRoute path="/attendance/listing" component={AttendanceListing} />
        <PrivateRoute path="/attendance" component={Attendance} />
        <PrivateRoute path="/overview" component={Overview} />
        <PrivateRoute path="/movements/new" component={NewMovement} />
        <PrivateRoute path="/movements" component={Movements} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
