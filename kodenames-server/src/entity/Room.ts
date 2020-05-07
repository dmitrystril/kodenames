import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Game } from './Game';
import { User } from './User';

@ObjectType()
@Entity('rooms')
export class Room extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Int)
  @Column()
  @Generated('increment')
  readonly no: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.room, {
    cascade: true,
    eager: true,
  })
  users: User[];

  @Field(() => Game)
  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;
}
