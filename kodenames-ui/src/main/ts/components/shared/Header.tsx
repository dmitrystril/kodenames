import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/Pages';
import { useUserQuery, useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../../../accessToken';
import { withRouter } from 'react-router';
import { Button } from './Button';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px;
  background-color: #4c473f;
  color: white;
  border-bottom: 1px solid #ffefd5;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const LoggedInAs = styled.div`
  justify-content: flex-end;
`;

const LogoutButton = styled(Button)`
  margin-left: 15px;
`;

const Header: React.FC<RouteComponentProps> = ({ history, children }) => {
  const { data, loading } = useUserQuery();
  const user = data && data.user;

  const [logout, { client }] = useLogoutMutation();

  const loggedInAs: string = user ? user.userName || user.email : '';

  return (
    <Root>
      <Options>{children}</Options>

      <LoggedInAs>{loggedInAs}</LoggedInAs>

      {!loading && user && (
        <LogoutButton
          onClick={async () => {
            await logout();
            setAccessToken('');
            history.push(Pages.LOGIN);
            await client!.resetStore();
          }}
        >
          Log Out
        </LogoutButton>
      )}
    </Root>
  );
};

export default withRouter(Header);
