import {
  Resolver,
  Mutation,
  Authorized,
  Ctx,
  Arg,
  Subscription,
  Root,
  PubSub,
  Publisher,
} from 'type-graphql';

import MyContext from '../MyContext';
import { GameService } from '../service/GameService';
import { Card } from '../entity/Card';
import {
  GameChangeNotification,
  GameChangeType,
} from '../entity/notification/GameChangeNotification';
import { CardOpen } from '../entity/notification/CardOpen';

const GAME_CHANGE_SUBSCRIPTION = 'GAME_CHANGE_SUBSCRIPTION';

@Resolver()
export class GameResolver {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  @Mutation(() => Boolean)
  @Authorized()
  createGame(@Ctx() context: MyContext) {
    return this.gameService.createGame(context.payload!.userId);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async openCard(
    @Arg('cardId') cardId: string,
    @PubSub(GAME_CHANGE_SUBSCRIPTION)
    publish: Publisher<GameChangeNotification>,
  ) {
    const card = await Card.findOne({
      where: { id: cardId },
    });

    if (card!.isOpen) {
      return false;
    }

    card!.isOpen = true;
    card!.save();

    let cardOpen = new CardOpen();
    cardOpen.cardId = card!.id;
    await publish({
      changeType: GameChangeType.CARD_OPEN,
      change: cardOpen,
    });
    return true;
  }

  @Subscription({ topics: GAME_CHANGE_SUBSCRIPTION })
  // @Authorized()
  subscribeToGameChange(
    @Root() gameChangeNotification: GameChangeNotification,
  ): GameChangeNotification {
    return gameChangeNotification;
  }
}
