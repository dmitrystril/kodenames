import { Query, Resolver, Mutation, Authorized, Ctx } from 'type-graphql';
import MyContext from '../MyContext';
import { GameService } from '../service/GameService';

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
}
