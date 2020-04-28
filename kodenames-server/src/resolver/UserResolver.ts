import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import { hash, verify } from "argon2";

import { User } from "../entity/User";
import MyContext from "../MyContext";
import { createAccessToken, createRefreshToken } from "../auth";
import { isAuth } from "../isAUth";
import { sendRefreshToken } from "../sendRefreshToken";
import { getConnection } from "typeorm";
import ErrorTypes from "../error/ErrorTypes";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  currentUser(@Ctx() context: MyContext) {
    return User.findOne(context.payload!.userId);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  users(@Ctx() {}: MyContext) {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const userAlreadyExists = await User.findOne({
      where: { email },
      select: ["id"],
    });

    if (userAlreadyExists) {
      throw new Error(ErrorTypes.EMAIL_IS_ALREADY_TAKEN);
    }

    const hashedPassword = await hash(password);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
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
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }
}
