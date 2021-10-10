import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Users from './pages/Users';
import Patients from './pages/Patients';
import Book from './pages/Book';
import Attendance from './pages/Attendance';
import Overview from './pages/Overview';
import Moviments from './pages/Moviments';
import AttPackages from './pages/AttPackages';
import NewUser from './pages/Users/NewUser';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/patients" exact={true} component={Patients} />
        <Route path="/users/new" exact={true} component={NewUser} />
        <Route path="/users" exact={true} component={Users} />
        <Route path="/agenda" exact={true} component={Book} />
        <Route path="/attendance" exact={true} component={Attendance} />
        <Route path="/overview" exact={true} component={Overview} />
        <Route path="/moviments" exact={true} component={Moviments} />
        <Route path="/packages" exact={true} component={AttPackages} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
