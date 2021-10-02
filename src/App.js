import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Patients from './pages/Patients';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/patients" exact={true} component={Patients} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
