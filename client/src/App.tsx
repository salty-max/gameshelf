import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import Menu from './components/Menu/Menu.component';
import PrivateRoute from './components/shared/PrivateRoute.component';
import Dashboard from './pages/Dashboard.page';
import Login from './pages/Login.page';
import Register from './pages/Register.page';
import { AppActions, RootState } from './redux';
import { loadUser } from './redux/modules/user';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const loadAction = () => dispatch(loadUser());

  useEffect(() => {
    console.log('coucou');
    loadAction();
  }, []);

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <Menu />
      <main className="col-start-2 col-span-3 lg:col-span-5 rounded-xxxl bg-gray h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <h1>Hello World</h1>} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <PrivateRoute
          exact
          path="/dashboard"
          component={() => (
            <Wrapper>
              <Dashboard />
            </Wrapper>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
