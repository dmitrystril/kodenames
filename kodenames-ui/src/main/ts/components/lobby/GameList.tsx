import React from 'react';
import styled from 'styled-components';

import { Button } from '../shared/Button';
import { useCurrentUserQuery } from '../../generated/graphql';

const Root = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #fdfbf4;
  overflow-y: scroll;
  height: 100%;
`;

const GameListRow = styled.li`
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

const GameListCell = styled.div`
  padding: 20px;
`;

const GameNumberCell = styled(GameListCell)`
  width: 20%;
`;

const PlayersCell = styled(GameListCell)`
  width: 40%;
`;

const ButtonCell = styled(GameListCell)`
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

interface GameListProps {
  games: any;
  currentGameId?: string;
  onJoinGame: Function;
}

export const GameList: React.FC<GameListProps> = ({
  games,
  currentGameId,
  onJoinGame,
}) => {
  return (
    <Root>
      {games &&
        games.map((game: any) => (
          <GameListRow key={game.id}>
            <GameNumberCell>Game #{game.no}</GameNumberCell>

            <PlayersCell>
              <div>
                <u>Players:</u>
              </div>
              {game.users.map((user: any) => (
                <UserName key={user.id}>{user.userName || user.email}</UserName>
              ))}
            </PlayersCell>

            <ButtonCell>
              <CustomButton onClick={() => onJoinGame(game.id)}>
                {currentGameId != game.id ? 'Join Game' : 'Back to Game'}
              </CustomButton>
            </ButtonCell>
          </GameListRow>
        ))}
    </Root>
  );
};
