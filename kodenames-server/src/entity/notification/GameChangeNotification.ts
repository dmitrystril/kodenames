import {
  ObjectType,
  Field,
  registerEnumType,
  createUnionType,
} from 'type-graphql';

import { CardOpen } from './CardOpen';
import { LogEntryAdd } from './LogEntryAdd';

export enum GameChangeType {
  CARD_OPEN = 'CARD_OPEN',
  LOG_ENTRY_ADD = 'LOG_ENTRY_ADD',
}
registerEnumType(GameChangeType, { name: 'GameChangeType' });

const GameChangeUnion = createUnionType({
  name: 'GameChange',
  types: () => [CardOpen, LogEntryAdd],
});

@ObjectType()
export class GameChangeNotification {
  @Field(() => GameChangeType, { nullable: false })
  changeType: GameChangeType;

  @Field(() => GameChangeUnion, { nullable: false })
  change: CardOpen | LogEntryAdd;
}
