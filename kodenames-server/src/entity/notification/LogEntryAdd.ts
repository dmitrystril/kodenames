import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LogEntryAdd {
  @Field(() => String, { nullable: false })
  logEntry: String;
}
