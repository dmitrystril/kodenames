import { Query, Resolver, Mutation, Authorized, Ctx, Arg } from 'type-graphql';

import MyContext from '../MyContext';
import { GameService } from '../service/GameService';
import { Card } from '../entity/Card';

@Resolver()
export class GameResolver {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  @Query(() => String)
  toBeDeleted() {
    return 'random string';
  }

  @Mutation(() => Boolean)
  @Authorized()
  createGame(@Ctx() context: MyContext) {
    return this.gameService.createGame(context.payload!.userId);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async openCard(@Arg('cardId') cardId: string) {
    const card = await Card.findOne({
      where: { id: cardId },
    });

    if (card!.isOpen) {
      return false;
    }

    card!.isOpen = true;
    card!.save();
    return true;
  }
}
