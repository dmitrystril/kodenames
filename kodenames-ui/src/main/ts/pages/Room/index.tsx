import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Table } from '../../components/room/Table';
import { Log } from '../../components/room/Log';
import { Chat } from '../../components/room/Chat';
import Header from '../../components/shared/Header';
import { Button } from '../../components/shared/Button';
import { Pages } from '../../constants/Pages';
import {
  useCurrentRoomQuery,
  useQuitRoomMutation,
} from '../../generated/graphql';

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
  const { data: currentRoomData } = useCurrentRoomQuery({
    fetchPolicy: 'network-only',
  });
  const [quitRoom] = useQuitRoomMutation();

  const handleQuitRoom = async () => {
    await quitRoom({
      variables: {
        roomId: currentRoomData!.currentRoom!.id,
      },
    });
    history.push(Pages.LOBBY);
  };

  return (
    <Root>
      <Header>
        <Button onClick={() => handleQuitRoom()}>&#x21A9; Quit Room</Button>
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
