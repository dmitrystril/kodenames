import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken, sendRefreshTokenReject } from './sendRefreshToken';
import { authChecker } from './authChecker';
import { resolvers } from './resolver';

(async () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.ORIGIN_URI,
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

  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.SERVER_PORT || 4000;

  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port}${apolloServer.graphqlPath}`,
    );
  });

  SubscriptionServer.create({ schema, execute, subscribe }, { server });
})();
