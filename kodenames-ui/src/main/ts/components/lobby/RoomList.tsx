import React from 'react';
import styled from 'styled-components';

import { Button } from '../shared/Button';

const Root = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #fdfbf4;
  overflow-y: scroll;
  height: 100%;
`;

const RoomListRow = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.2rem;
  :not(:last-child) {
    border-bottom: 1px solid #ccbfaa;
  }
  :hover {
    background-color: gainsboro;
    transition: 0.2s;
  }
`;

const RoomListCell = styled.div`
  padding: 20px;
`;

const RoomNumberCell = styled(RoomListCell)`
  width: 20%;
`;

const PlayersCell = styled(RoomListCell)`
  width: 40%;
`;

const ButtonCell = styled(RoomListCell)`
  width: 40%;
  text-align: right;
`;

const CustomButton = styled(Button)`
  background-color: rgb(128, 120, 107, 0.3);
`;

const UserName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface RoomListProps {
  rooms: any;
  currentRoomId?: string;
  onJoinRoom: Function;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  currentRoomId,
  onJoinRoom,
}) => {
  return (
    <Root>
      {rooms &&
        rooms.map((room: any) => (
          <RoomListRow key={room.id}>
            <RoomNumberCell>Room #{room.no}</RoomNumberCell>

            <PlayersCell>
              <div>
                <u>Players:</u>
              </div>
              {room.users.map((user: any) => (
                <UserName key={user.id}>{user.userName || user.email}</UserName>
              ))}
            </PlayersCell>

            <ButtonCell>
              <CustomButton onClick={() => onJoinRoom(room.id)}>
                {currentRoomId !== room.id ? 'Join Room' : 'Back to Room'}
              </CustomButton>
            </ButtonCell>
          </RoomListRow>
        ))}
    </Root>
  );
};
