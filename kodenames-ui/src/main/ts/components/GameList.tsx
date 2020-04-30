import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  border: 1px solid silver;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
`;

const UserName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface GameListProps {
  gamesData: any;
}

export const GameList: React.FC<GameListProps> = ({ gamesData }) => {
  return (
    <Root>
      {gamesData &&
        gamesData.games.map((game: any) => (
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
              <Button>Join game</Button>
            </ButtonCell>
          </GameListRow>
        ))}
    </Root>
  );
};
