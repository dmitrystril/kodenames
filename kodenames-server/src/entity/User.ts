import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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
  @Column({ nullable: true })
  userName?: string;

  @ManyToOne(() => Room, (room) => room.users)
  @Field(() => Room)
  room: Room;

  @Column()
  password: string;

  @Column({ default: 0 })
  tokenVersion: number;
}
