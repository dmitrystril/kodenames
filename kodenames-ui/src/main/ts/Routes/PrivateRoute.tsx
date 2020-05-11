import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Pages } from '../constants/Pages';

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={Pages.LOGIN} />
        )
      }
    />
  );
};
