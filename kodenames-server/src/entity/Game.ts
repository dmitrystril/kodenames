import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';

import { Card } from './Card';
import { Player } from './Player';

@ObjectType()
@Entity('games')
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => [Card])
  @OneToMany(() => Card, (card) => card.game, { cascade: true, eager: true })
  cards: Card[];

  @Field(() => [Player])
  @OneToMany(() => Player, (player) => player.game, {
    cascade: true,
    eager: true,
  })
  players: Player[];

  @Field(() => Date)
  @Column()
  dateCreated: Date;
}
