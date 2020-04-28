import { Resolver, Query, UseMiddleware, Mutation, Arg } from "type-graphql";

import { isAuth } from "../isAUth";
import { Game } from "../entity/Game";
import { User } from "../entity/User";

@Resolver()
export class GameResolver {
  @Query(() => [Game])
  @UseMiddleware(isAuth)
  games() {
    return Game.find();
  }

  @Mutation(() => Game)
  async createGame(@Arg("userId") userId: Number) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      const game = await Game.create({ users: [user!] }).save();

      return game;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
