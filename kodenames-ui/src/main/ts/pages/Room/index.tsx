import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  useFullUserQuery,
  useQuitRoomMutation,
  useSubscribeToGameChangeSubscription,
  User as UserType,
  GameChangeType,
  CardOpen,
} from '../../generated/graphql';
import { Room } from './Room';
import { Pages } from '../../constants/Pages';

export const RoomContainer: React.FC = () => {
  const [userState, setUserState] = useState<UserType>();

  const history = useHistory();

  const { data: userData, loading: userDataLoading } = useFullUserQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => setUserState(data!.user as UserType),
  });

  useSubscribeToGameChangeSubscription({
    onSubscriptionData: (options) => {
      const {
        change,
        changeType,
      } = options.subscriptionData.data!.subscribeToGameChange;

      switch (changeType) {
        case GameChangeType.CardOpen: {
          const cardOpen = change as CardOpen;
          console.log('change: ' + cardOpen.cardId);
          break;
        }
        default:
          console.log('Game changed somehow ¯\\_(ツ)_/¯');
      }
    },
  });

  const [quitRoom] = useQuitRoomMutation();

  const handleQuitRoom = async () => {
    await quitRoom({
      variables: {
        roomId: userState!.room!.id,
      },
    });
    history.push(Pages.LOBBY);
  };

  if (!userData || userDataLoading || !userState) {
    return <div>Loading...</div>;
  }

  if (userState && !userState.room) {
    return <div>User has not joined any room...</div>;
  }

  return <Room room={userState!.room!} handleQuitRoom={handleQuitRoom} />;
};
