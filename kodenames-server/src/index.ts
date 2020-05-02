import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';

import { UserResolver } from './resolver/UserResolver';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken, sendRefreshTokenReject } from './sendRefreshToken';
import { GameResolver } from './resolver/GameResolver';
import { authChecker } from './authChecker';

(async () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(cookieParser());

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return sendRefreshTokenReject(res);
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.error(error);
      return sendRefreshTokenReject(res);
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return sendRefreshTokenReject(res);
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return sendRefreshTokenReject(res);
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, GameResolver],
      authChecker,
    }),
    context: ({ req, res }) => ({ req, res }),
    formatError: (err) => {
      // TODO: do some error formatting here
      return err;
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('express server started');
  });
})();
