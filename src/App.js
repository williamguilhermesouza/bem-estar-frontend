import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
