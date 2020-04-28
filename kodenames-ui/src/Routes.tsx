import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Pages } from './main/ts/constants/Pages';
import { Register } from './main/ts/pages/Register';
import { Login } from './main/ts/pages/Login';
import { Lobby } from './main/ts/pages/Lobby';
import { Game } from './main/ts/pages/Game';
import { getAccessToken } from './accessToken';

const isUserAuthenticated = () => {
  return getAccessToken() !== '';
};

const PrivateRoute = (props: any) => (
  <>{isUserAuthenticated() ? props.children : <Redirect to={Pages.LOGIN} />}</>
);

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Pages.REGISTER} component={Register} />
        <Route exact path={Pages.LOGIN} component={Login} />

        <PrivateRoute>
          <Route exact path={Pages.LOBBY} component={Lobby} />
          <Route exact path={Pages.GAME} component={Game} />
          <Redirect from="/**" to={Pages.LOBBY} />
        </PrivateRoute>

        <Redirect from="/**" to={Pages.LOGIN} />
      </Switch>
    </BrowserRouter>
  );
};
