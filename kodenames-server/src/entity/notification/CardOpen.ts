import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CardOpen {
  @Field(() => String, { nullable: false })
  cardId: String;
}
