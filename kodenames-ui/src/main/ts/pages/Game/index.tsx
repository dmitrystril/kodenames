import React from 'react';
import styled from 'styled-components';

import { Table } from '../../components/Table';
import { Log } from '../../components/Log';
import { Chat } from '../../components/Chat';
import Header from '../../components/Header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GameLayout = styled.div`
  display: flex;
  height: 100%;
  background-color: #4c473f;
  padding: 10px;
`;

const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  margin-right: 10px;
`;

const ColumnTwo = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
`;

export const Game: React.FC = () => {
  return (
    <Root>
      <Header />

      <GameLayout>
        <ColumnOne>
          <Table />
          <Log />
        </ColumnOne>

        <ColumnTwo>
          <Chat />
        </ColumnTwo>
      </GameLayout>
    </Root>
  );
};
