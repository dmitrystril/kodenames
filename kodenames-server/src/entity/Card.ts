import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Game } from './Game';

export enum CardType {
  RED = 'RED',
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}
registerEnumType(CardType, { name: 'CardType' });

@ObjectType()
@Entity('cards')
export class Card extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => CardType)
  @Column()
  type: CardType;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.cards)
  game: Game;

  @Field(() => Boolean)
  @Column()
  isActive: boolean;
}
