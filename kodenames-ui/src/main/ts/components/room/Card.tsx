import React from 'react';
import styled from 'styled-components';

import { CardType } from '../../generated/graphql';

const Root = styled.div<{ type: CardType; isOpen: boolean }>`
  border-radius: 10px;
  flex: 1 0 18%;
  margin: 0 10px 10px 0;
  border: 2px solid #ccbfaa;
  box-shadow: inset 0 0 2px 0 black;
  display: flex;
  flex-direction: column;
  background: ${({ type, isOpen }) =>
    isOpen
      ? handleColorType(type)
      : 'repeating-linear-gradient(315deg, #f8e7cf, #efc587 40%, white);'};
  user-select: none;
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    border: 2px solid white;
  }
`;

const handleColorType = (type: CardType) => {
  switch (type) {
    case CardType.Red:
      return 'repeating-linear-gradient(315deg, #ff0065, #f75d59 40%, white);';
    case CardType.Blue:
      return 'repeating-linear-gradient(315deg, #1f45fc, #2b65ec 40%, white);';
    case CardType.White:
      return 'repeating-linear-gradient(315deg, #c0c0c0, #fefcff 40%, white);';
    case CardType.Black:
      return 'repeating-radial-gradient(circle, #505050, #505050 10px, #080808 10px, #080808 20px);';
  }
};

const Circle = styled.div`
  width: 17px;
  height: 17px;
  background-color: white;
  border: 3px solid #ccbfaa;
  border-radius: 50%;
  margin: 5px auto;
  box-shadow: inset 0 0 2px 0 black;
`;

const HorizontalLine = styled.hr`
  margin: auto 5px 4px 5px;
  border: 0;
  border-bottom: 1px solid #4c473f;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3em 0;
  background: white;
  margin: 0 5px 5px 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-weight: 600;
  text-transform: uppercase;
`;

interface ICardProps {
  card: any;
  onOpenCard: Function;
}

export const Card: React.FC<ICardProps> = ({ card, onOpenCard }) => {
  return (
    <Root
      type={card.type}
      isOpen={card.isOpen}
      onDoubleClick={() => onOpenCard(card.id)}
    >
      <Circle />
      <HorizontalLine />
      <Label>{card.word}</Label>
    </Root>
  );
};
