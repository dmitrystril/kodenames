import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';
import { useOpenCardMutation } from '../../generated/graphql';

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
  const [openCard] = useOpenCardMutation();

  const handleOpenCard = async (cardId: string) => {
    await openCard({
      variables: {
        cardId,
      },
    });
  };

  game.cards = game.cards.sort((card1: any, card2: any) => card1.no - card2.no);

  return (
    <Root>
      {game.cards.map((card: any, index: number) => (
        <Card card={card} key={index} onOpenCard={handleOpenCard} />
      ))}
    </Root>
  );
};
