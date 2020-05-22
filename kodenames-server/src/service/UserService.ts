import { hash } from 'argon2';

import { User } from '../entity/User';
import { Player } from '../entity/Player';
import ErrorTypes from '../error/ErrorTypes';

export class UserService {
  getUser = async (userId: string) => {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['room', 'room.game'],
    });

    return user;
  };

  register = async (
    email: string,
    password: string,
    userName: string,
  ): Promise<boolean> => {
    const userAlreadyExists = await this.isExistingUser(email);
    if (userAlreadyExists) {
      throw new Error(ErrorTypes.EMAIL_IS_ALREADY_TAKEN);
    }

    const hashedPassword = await hash(password);

    try {
      const player = await Player.create().save();

      await User.create({
        email,
        password: hashedPassword,
        userName,
        player,
      }).save();
    } catch (error) {
      throw new Error("Can't create user and player");
    }

    return true;
  };

  isExistingUser = (email: String): Promise<User | undefined> => {
    return User.findOne({
      where: { email },
      select: ['id'],
    });
  };
}
