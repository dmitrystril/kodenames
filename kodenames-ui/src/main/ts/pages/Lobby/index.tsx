import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header';
import { PUZZLE_IMAGE } from '../../../resources/styles/images/svg/svgBase64';
import { Pages } from '../../constants/Pages';
import {
  useCreateGameMutation,
  useGamesQuery,
  useCurrentUserQuery,
} from '../../generated/graphql';
import { GameList } from '../../components/GameList';

const Root = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #4c473f;
  background-size: cover;
  background-image: url(${PUZZLE_IMAGE});
`;

const GameListWrapper = styled.div`
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

const Button = styled.button`
  padding: 5px;
  border: 1px solid silver;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
`;

export const Lobby: React.FC = () => {
  const history = useHistory();
  const [createGame] = useCreateGameMutation();
  const { data: userData, loading } = useCurrentUserQuery();
  const { data: gamesData } = useGamesQuery({
    fetchPolicy: 'network-only',
  });

  const handleCreateGame = async () => {
    const game = await createGame({
      variables: {
        userId: userData!.currentUser!.id,
      },
    }).catch((error) => {
      console.error('game not created', error);
    });

    if (game) {
      history.push(Pages.GAME);
    }
  };

  const handleRefreshList = async () => {};

  return (
    <Root>
      <Header />
      <GameListWrapper>
        <ControlPanel>
          <Button onClick={handleCreateGame}>Create new game</Button>
          <Button onClick={handleRefreshList}>Refresh list</Button>
        </ControlPanel>

        <GameList gamesData={gamesData} />
      </GameListWrapper>
    </Root>
  );
};
