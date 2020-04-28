import React from 'react';

import { useUsersQuery } from '../../generated/graphql';
import Header from '../../components/Header';

export const Users: React.FC = () => {
  const { data, error } = useUsersQuery({
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.error(error);
    return <div>error</div>;
  }

  return (
    <>
      <Header />

      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </>
  );
};
