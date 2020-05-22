import { Room } from '../entity/Room';
import { User } from '../entity/User';
import { GameService } from './GameService';

export class RoomService {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  getAllRooms = async (): Promise<Room[]> => {
    const rooms = await Room.find({
      order: {
        no: 'DESC',
      },
    });

    return rooms;
  };

  createRoom = async (userId: string): Promise<Room> => {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });

      const game = await this.gameService.createGame(user!.id);
      const room = await Room.create({ users: [user!], game }).save();

      return room;
    } catch (error) {
      throw new Error("Can't create room" + error);
    }
  };

  joinRoom = async (userId: string, roomId: string): Promise<Room> => {
    try {
      const user = await User.findOne({ where: { id: userId } });
      let room = await Room.findOne({
        where: { id: roomId },
        relations: ['game'],
      });

      // TODO: check whether room already contains player on 'join room'
      const game = room!.game;
      game.players.push(user!.player);
      await game.save();

      room!.users.push(user!);
      room = await room!.save();
      return room;
    } catch (error) {
      throw new Error("Can't join room" + error);
    }
  };

  quitRoom = async (userId: string, roomId: string): Promise<boolean> => {
    try {
      const user = await User.findOne({ where: { id: userId } });

      let room = await Room.findOne({
        where: { id: roomId },
        relations: ['game'],
      });

      room!.users = room!.users.filter((user) => {
        return user.id != userId;
      });
      await room!.save();

      const game = room!.game;
      game!.players = game!.players.filter((player) => {
        return player.id != user!.player.id;
      });
      await game.save();
      return true;
    } catch (error) {
      throw new Error("Can't quit room" + error);
    }
  };
}
