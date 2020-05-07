import { User } from '../entity/User';
import { Game } from '../entity/Game';
import { TeamType } from '../entity/Player';

export class GameService {
  async createGame(userId: string): Promise<Game> {
    const user = await User.findOne({
      where: { id: userId },
    });

    const player = user!.player;
    player.team = TeamType.RED;
    await player.save();

    const game = await Game.create({
      players: [player],
      dateCreated: new Date(),
    }).save();

    return game;
  }
}
