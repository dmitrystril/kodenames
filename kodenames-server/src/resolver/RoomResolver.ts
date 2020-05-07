import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import { Room } from '../entity/Room';
import { User } from '../entity/User';
import MyContext from '../MyContext';
import { GameService } from '../service/GameService';

// const NOTIFICATION_SUB = 'NOTIFICATION_SUB';

@Resolver()
export class RoomResolver {
  @Query(() => [Room])
  @Authorized()
  rooms() {
    return Room.find({
      order: {
        no: 'DESC',
      },
    });
  }

  @Mutation(() => Room)
  @Authorized()
  async createRoom(@Ctx() context: MyContext) {
    const gameService = new GameService();

    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });

      const game = await gameService.createGame(user!.id);

      const room = await Room.create({ users: [user!], game }).save();
      return room;
    } catch (error) {
      throw new Error("can't create room" + error);
    }
  }

  @Mutation(() => Room)
  @Authorized()
  async joinRoom(@Ctx() context: MyContext, @Arg('roomId') roomId: string) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
      });
      let room = await Room.findOne({ where: { id: roomId } });

      // TODO: check whether room already contains player on 'join room'
      room!.users.push(user!);
      room = await room!.save();
      return room;
    } catch (error) {
      throw new Error("can't join room" + error);
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async quitRoom(@Ctx() context: MyContext, @Arg('roomId') roomId: string) {
    try {
      let room = await Room.findOne({ where: { id: roomId } });

      room!.users = room!.users.filter((user) => {
        return user.id != context.payload!.userId;
      });

      await room!.save();
      return true;
    } catch (error) {
      throw new Error("can't quit room" + error);
    }
  }

  @Query(() => Room, { nullable: true })
  @Authorized()
  async currentRoom(@Ctx() context: MyContext) {
    try {
      const user = await User.findOne({
        where: { id: context.payload!.userId },
        relations: ['room', 'room.game'],
      });

      return user!.room;
    } catch (error) {
      throw new Error("can't get current room" + error);
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
