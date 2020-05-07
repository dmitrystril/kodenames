import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Player } from './Player';
import { Room } from './Room';

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
  @Column()
  userName: string;

  @Field(() => Player)
  @OneToOne(() => Player, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  player: Player;

  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.users)
  room: Room;

  @Column()
  password: string;

  @Column({ default: 0 })
  tokenVersion: number;
}
