import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity("games")
export class Game extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.game, { cascade: true, eager: true })
  @Field(() => [User], { nullable: true })
  users: User[];
}
