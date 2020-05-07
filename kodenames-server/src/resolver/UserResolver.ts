import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { verify } from 'argon2';
import { getConnection } from 'typeorm';

import { User } from '../entity/User';
import MyContext from '../MyContext';
import { createAccessToken, createRefreshToken } from '../auth';
import { sendRefreshToken } from '../sendRefreshToken';
import ErrorTypes from '../error/ErrorTypes';
import { LoginResponse } from './responseType/LoginResponse';
import { RegisterInput } from './inputType/RegisterInput';
import { UserService } from '../service/UserService';

@Resolver(User)
export class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  currentUser(@Ctx() context: MyContext) {
    return this.userService.getCurrentUser(context.payload!.userId);
  }

  @Mutation(() => Boolean)
  register(@Arg('input') registerInput: RegisterInput) {
    const { email, password, userName } = registerInput;

    return this.userService.register(email, password, userName);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error(ErrorTypes.USER_NOT_FOUND);
    }

    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw new Error(ErrorTypes.PASSWORD_IS_INCORRECT);
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => String) userId: string,
  ) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');

    return true;
  }
}
