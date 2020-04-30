import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/Pages';
import { useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../../../accessToken';
import { withRouter } from 'react-router';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px;
  background-color: #4c473f;
  color: white;
  border-bottom: 1px solid #ffefd5;
`;

const LogoutButton = styled.button`
  padding: 3px 5px;
  margin-left: 15px;
  border: 1px solid silver;
  border-radius: 3px;
  cursor: pointer;
`;

const Header: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading } = useCurrentUserQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.currentUser) {
    body = <div>logged in as: {data.currentUser.userName || data.currentUser.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <Root>
      {body}

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
