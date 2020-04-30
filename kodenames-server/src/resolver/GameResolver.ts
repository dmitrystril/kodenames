import {
  Resolver,
  Query,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
} from 'type-graphql';

import { isAuth } from '../isAUth';
import { Game } from '../entity/Game';
import { User } from '../entity/User';
import MyContext from 'src/MyContext';

@Resolver()
export class GameResolver {
  @Query(() => [Game])
  @UseMiddleware(isAuth)
  games() {
    return Game.find();
  }

  @Mutation(() => Game)
  @UseMiddleware(isAuth)
  async createGame(@Ctx() context: MyContext) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });
      const game = await Game.create({ users: [user!] }).save();

      return game;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => Game)
  @UseMiddleware(isAuth)
  async joinGame(@Ctx() context: MyContext, @Arg('gameId') gameId: string) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });
      let game = await Game.findOne({ where: { id: gameId } });

      if (game) {
        game.users.push(user!);
        game = await game.save();
        return game;
      } else {
        throw new Error('game not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
