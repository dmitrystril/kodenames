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

const Header: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading } = useCurrentUserQuery();
  const [logout, { client }] = useLogoutMutation();

  let loggedInAs: string = `logged in as: ${
    data ? data.currentUser!.userName || data.currentUser!.email : ''
  }`;

  return (
    <Root>
      <Options>asdad</Options>

      <LoggedInAs>{loggedInAs}</LoggedInAs>

      {!loading && data && data.currentUser && (
        <LogoutButton
          onClick={async () => {
            await logout();
            setAccessToken('');
            history.push(Pages.LOGIN);
            await client!.resetStore();
          }}
        >
          Log out
        </LogoutButton>
      )}
    </Root>
  );
};

export default withRouter(Header);
