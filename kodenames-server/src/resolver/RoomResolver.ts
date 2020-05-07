import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import { Room } from '../entity/Room';
import MyContext from '../MyContext';
import { RoomService } from '../service/RoomService';

@Resolver()
export class RoomResolver {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  @Query(() => [Room])
  @Authorized()
  rooms() {
    return this.roomService.getAllRooms();
  }

  @Mutation(() => Room)
  @Authorized()
  createRoom(@Ctx() context: MyContext) {
    return this.roomService.createRoom(context.payload!.userId);
  }

  @Mutation(() => Room)
  @Authorized()
  joinRoom(@Ctx() context: MyContext, @Arg('roomId') roomId: string) {
    return this.roomService.joinRoom(context.payload!.userId, roomId);
  }

  @Mutation(() => Boolean)
  @Authorized()
  quitRoom(@Ctx() context: MyContext, @Arg('roomId') roomId: string) {
    return this.roomService.quitRoom(context.payload!.userId, roomId);
  }

  @Query(() => Room, { nullable: true })
  @Authorized()
  currentRoom(@Ctx() context: MyContext) {
    return this.roomService.getCurrentRoom(context.payload!.userId);
  }
}
