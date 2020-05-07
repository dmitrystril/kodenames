import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

import { Game } from './Game';

export enum TeamType {
  RED = 'RED',
  BLUE = 'BLUE',
}
registerEnumType(TeamType, { name: 'TeamType' });

@ObjectType()
@Entity('players')
export class Player extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.players)
  game: Game;

  @Field(() => TeamType, { nullable: true })
  @Column({ nullable: true })
  team: TeamType;
}
