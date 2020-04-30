import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Game } from './Game';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ nullable: true })
  userName?: string;

  @ManyToOne(() => Game, (game) => game.users)
  @Field(() => Game)
  game: Game;

  @Column()
  password: string;

  @Column({ default: 0 })
  tokenVersion: number;
}
