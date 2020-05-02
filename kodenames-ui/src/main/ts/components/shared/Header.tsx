import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/Pages';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '../../generated/graphql';
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
  margin-right: auto;
`;

const LoggedInAs = styled.div`
  justify-content: flex-end;
`;

const LogoutButton = styled(Button)`
  margin-left: 15px;
`;

const Header: React.FC<RouteComponentProps> = ({ history, children }) => {
  const { data, loading } = useCurrentUserQuery();
  const currentUser = data && data.currentUser;

  const [logout, { client }] = useLogoutMutation();

  const loggedInAs: string = currentUser
    ? currentUser.userName || currentUser.email
    : '';

  return (
    <Root>
      <Options>{children}</Options>

      <LoggedInAs>{loggedInAs}</LoggedInAs>

      {!loading && currentUser && (
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
