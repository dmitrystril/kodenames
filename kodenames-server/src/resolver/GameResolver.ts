import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import { Game } from '../entity/Game';
import { User } from '../entity/User';
import MyContext from '../MyContext';

// const NOTIFICATION_SUB = 'NOTIFICATION_SUB';

@Resolver()
export class GameResolver {
  @Query(() => [Game])
  @Authorized()
  games() {
    return Game.find({
      order: {
        no: 'DESC',
      },
    });
  }

  @Mutation(() => Game)
  @Authorized()
  async createGame(@Ctx() context: MyContext) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });
      const game = await Game.create({ users: [user!] }).save();
      return game;
    } catch (error) {
      throw new Error("can't create game" + error);
    }
  }

  @Mutation(() => Game)
  @Authorized()
  async joinGame(@Ctx() context: MyContext, @Arg('gameId') gameId: string) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });
      let game = await Game.findOne({ where: { id: gameId } });

      // TODO: check whether game already contains user on 'join game'
      game!.users.push(user!);
      game = await game!.save();
      return game;
    } catch (error) {
      throw new Error("can't join game" + error);
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async quitGame(@Ctx() context: MyContext, @Arg('gameId') gameId: string) {
    const userId = context.payload?.userId;
    try {
      let game = await Game.findOne({ where: { id: gameId } });

      game!.users = game!.users.filter((user) => {
        return user.id != userId;
      });

      await game!.save();
      return true;
    } catch (error) {
      throw new Error("can't quit game" + error);
    }
  }

  @Query(() => Game, { nullable: true })
  @Authorized()
  async currentGame(@Ctx() context: MyContext) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
        relations: ['game'],
      });

      return user!.game;
    } catch (error) {
      throw new Error("can't get current game" + error);
    }
  }

  // @Mutation(() => Boolean)
  // async createNotification(
  //   @PubSub(NOTIFICATION_SUB) publish: Publisher<Notification>,
  //   @Arg('title', { nullable: true }) title?: string,
  //   @Arg('message', { nullable: true }) message?: string,
  // ): Promise<boolean> {
  //   await publish({ title, message, date: new Date() });
  //   return true;
  // }

  // @Subscription({ topics: NOTIFICATION_SUB })
  // subscribeToNotifications(
  //   @Root() { title, message, date }: Notification,
  // ): Notification {
  //   return { title, message, date };
  // }
}
