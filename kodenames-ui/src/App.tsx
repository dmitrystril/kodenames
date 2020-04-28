import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

const Root = styled.div`
  background-color: #4c473f;
  height: 100%;
`;

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (data) => {
      const { accessToken } = await data.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Root>loading...</Root>;
  }

  return <Routes />;
};
