import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.component';
import Login from './pages/Login.page';
import Register from './pages/Register.page';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <h1>Hello World</h1>} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <PrivateRoute path="/games" component={() => <h1>Games</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
