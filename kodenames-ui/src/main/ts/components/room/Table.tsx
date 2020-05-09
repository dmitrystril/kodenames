import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;
  flex-basis: 75%;
`;

interface ITableProps {
  game: any;
}

export const Table: React.FC<ITableProps> = ({ game }) => {
  return (
    <Root>
      {game &&
        game.cards.map((card: any, index: number) => (
          <Card card={card} key={index} />
        ))}
    </Root>
  );
};
