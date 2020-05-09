import { CardType, TeamType } from '../generated/graphql';

type Room = {
  id: string;
  no: number;
  game: Game;
};

type Game = {
  id: string;
  cards: Array<Card>;
  players: Array<Player>;
  dateCreated: Date;
};

type Card = {
  id: string;
  type: CardType;
  word: string;
  isOpen: boolean;
  isActive: boolean;
};

type Player = {
  id: string;
  team: TeamType;
};

export type { Room, Game, Card, Player };
