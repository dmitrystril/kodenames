import React from 'react';
import styled from 'styled-components';

import { Table } from '../../components/room/Table';
import { Log } from '../../components/room/Log';
import { Chat } from '../../components/room/Chat';
import Header from '../../components/shared/Header';
import { Button } from '../../components/shared/Button';
import { Room as RoomType } from '../../generated/graphql';

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

const RoomNo = styled.div`
  margin-left: 15px;
`;

const QuitRoomButton = styled(Button)`
  border-radius: 50%;
  padding: 0.3em 0.6em;
`;

interface IRoomProps {
  room: RoomType;
  handleQuitRoom: Function;
}

export const Room: React.FC<IRoomProps> = ({ room, handleQuitRoom }) => {
  return (
    <Root>
      <Header>
        <QuitRoomButton onClick={() => handleQuitRoom()}>
          &#x21A9;
        </QuitRoomButton>
        <RoomNo>Room #{room.no}</RoomNo>
      </Header>

      <RoomLayout>
        <ColumnOne>
          <Table game={room.game} />
          <Log />
        </ColumnOne>

        <ColumnTwo>
          <Chat />
        </ColumnTwo>
      </RoomLayout>
    </Root>
  );
};
