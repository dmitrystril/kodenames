import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;
  flex-basis: 75%;
`;

export const Table: React.FC = () => {
  return (
    <Root>
      {[...Array(25)].map((_, index: number) => (
        <Card key={index} />
      ))}
    </Root>
  );
};
