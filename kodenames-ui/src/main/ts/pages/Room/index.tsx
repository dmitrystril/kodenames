import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Table } from '../../components/room/Table';
import { Log } from '../../components/room/Log';
import { Chat } from '../../components/room/Chat';
import Header from '../../components/shared/Header';
import { Button } from '../../components/shared/Button';
import { useCurrentRoomQuery } from '../../generated/graphql';
import { Pages } from '../../constants/Pages';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RoomLayout = styled.div`
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

export const Room: React.FC = () => {
  const history = useHistory();
  const { data } = useCurrentRoomQuery();
  const currentRoom = data && data.currentRoom;

  console.log('data: ', currentRoom);

  const handleNavigateToLobby = async () => {
    history.push(Pages.LOBBY);
  };

  return (
    <Root>
      <Header>
        <Button onClick={() => handleNavigateToLobby()}>
          &#x21A9; Back to Lobby
        </Button>
      </Header>

      <RoomLayout>
        <ColumnOne>
          <Table />
          <Log />
        </ColumnOne>

        <ColumnTwo>
          <Chat />
        </ColumnTwo>
      </RoomLayout>
    </Root>
  );
};