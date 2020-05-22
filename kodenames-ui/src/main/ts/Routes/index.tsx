import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { Pages } from '../constants/Pages';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Lobby } from '../pages/Lobby';
import { RoomContainer } from '../pages/Room';
import { getAccessToken } from '../../../accessToken';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const isAuthenticated = () => getAccessToken() !== '';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path={Pages.REGISTER}
          component={Register}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path={Pages.LOGIN}
          component={Login}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path={Pages.LOBBY}
          component={Lobby}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path={Pages.ROOM}
          component={RoomContainer}
          isAuthenticated={isAuthenticated}
        />
        <Redirect
          exact
          from="/"
          to={isAuthenticated() ? Pages.LOBBY : Pages.LOGIN}
        />
        <Redirect
          from="/**"
          to={isAuthenticated() ? Pages.LOBBY : Pages.LOGIN}
        />
      </Switch>
    </BrowserRouter>
  );
};
