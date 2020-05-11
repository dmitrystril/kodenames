import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
