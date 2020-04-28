import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { Game } from "./Game";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @ManyToOne(() => Game, (game) => game.users)
  @Field(() => Game, { nullable: true })
  game: Game;

  @Column()
  password: string;

  @Column({ default: 0 })
  tokenVersion: number;
}
