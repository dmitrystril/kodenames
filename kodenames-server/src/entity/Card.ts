import { ObjectType, Field, ID, registerEnumType, Int } from 'type-graphql';
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

  @Field(() => Int)
  @Column()
  readonly no: number;

  @Field(() => String)
  @Column()
  word: string;

  @Field(() => CardType)
  @Column()
  type: CardType;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.cards)
  game: Game;

  @Field(() => Boolean)
  @Column()
  isOpen: boolean;

  @Field(() => Boolean)
  @Column()
  isActive: boolean;
}
