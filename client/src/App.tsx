import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.component';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <h1>Hello World</h1>} />
        <Route exact path="/login" component={() => <h1>Login</h1>} />
        <PrivateRoute path="/games" component={() => <h1>Games</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
