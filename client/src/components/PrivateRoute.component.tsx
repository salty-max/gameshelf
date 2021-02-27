import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useTypedSelector } from '../redux';

interface IPrivateRouteProps {
  component: FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: Component, path, exact = false }: IPrivateRouteProps) => {
  const { authenticated } = useTypedSelector((state) => state.user);
  const message = 'Please log in to view this page';

  const render = (props: RouteComponentProps) =>
    authenticated && localStorage.getItem('auth')?.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            message,
            requestedPath: path,
          },
        }}
      />
    );

  return <Route exact={exact} path={path} render={render} />;
};

export default PrivateRoute;
