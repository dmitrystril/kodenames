import { Query, Resolver, Mutation, Authorized, Ctx } from 'type-graphql';
import { Game } from '../entity/Game';
import MyContext from '../MyContext';
import { GameService } from '../service/GameService';

@Resolver()
export class GameResolver {
  @Query(() => String)
  toBeDeleted() {
    return 'random string';
  }

  @Mutation(() => Game)
  @Authorized()
  async createGame(@Ctx() context: MyContext) {
    const gameService = new GameService();

    try {
      return gameService.createGame(context.payload!.userId);
    } catch (error) {
      throw new Error("can't create game" + error);
    }
  }
}
