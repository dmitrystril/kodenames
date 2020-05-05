import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Generated,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

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

  @OneToMany(() => User, (user) => user.room, { cascade: true, eager: true })
  @Field(() => [User])
  users: User[];
}
