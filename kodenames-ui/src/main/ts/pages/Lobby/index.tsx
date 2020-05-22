import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/shared/Header';
import { PUZZLE_IMAGE } from '../../../resources/styles/images/svg/svgBase64';
import { Pages } from '../../constants/Pages';
import {
  useCreateRoomMutation,
  useRoomsQuery,
  useJoinRoomMutation,
} from '../../generated/graphql';
import { RoomList } from '../../components/lobby/RoomList';
import { Button } from '../../components/shared/Button';

const Root = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #4c473f;
  background-size: cover;
  background-image: url(${PUZZLE_IMAGE});
`;

const RoomListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ccbfaa;
  margin: 0 auto;
  width: 55%;
  height: 100%;
  margin-top: 20px;
  padding: 0 10px 0 10px;
  overflow-y: hidden;
  border-radius: 3px;
  box-shadow: 0px 0px 27px 4px rgba(0, 0, 0, 0.75);
`;

const ControlPanel = styled.div`
  padding: 10px 0;
`;

const CustomButton = styled(Button)`
  margin-right: 5px;
`;

export const Lobby: React.FC = () => {
  const history = useHistory();
  const [createRoom] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();
  const { data: roomsData, refetch: loadRooms } = useRoomsQuery({
    fetchPolicy: 'network-only',
  });
  const rooms = roomsData && roomsData.rooms;

  const handleCreateRoom = async () => {
    const room = await createRoom().catch((error) => {
      console.error('room not created', error);
    });
    if (room) {
      history.push(Pages.ROOM);
    }
  };

  const handleRefreshList = () => {
    loadRooms();
  };

  const handleJoinRoom = async (roomId: string) => {
    const room = await joinRoom({
      variables: {
        roomId,
      },
    }).catch((error) => {
      console.error("can't join room", error);
    });
    if (room) {
      history.push(Pages.ROOM);
    }
  };

  return (
    <Root>
      <Header />
      <RoomListWrapper>
        <ControlPanel>
          <CustomButton onClick={handleCreateRoom}>
            Create New Room
          </CustomButton>
          <CustomButton onClick={handleRefreshList}>Refresh List</CustomButton>
        </ControlPanel>

        <RoomList rooms={rooms} onJoinRoom={handleJoinRoom} />
      </RoomListWrapper>
    </Root>
  );
};
