import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  border-radius: 10px;
  flex: 1 0 18%;
  margin: 0 10px 10px 0;
  border: 2px solid #ccbfaa;
  box-shadow: inset 0 0 2px 0 black;
  display: flex;
  flex-direction: column;
  background: repeating-linear-gradient(315deg, #f8e7cf, #efc587 40%, white);
  user-select: none;
  cursor: pointer;
  transition: transform .2s;
  :hover {
    border: 2px solid white;
  }
`;

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

export const Card: React.FC = () => {
  return (
    <Root>
      <Circle />
      <HorizontalLine />
      <Label>Placeholder</Label>
    </Root>
  );
};
