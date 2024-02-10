import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dynamoose from 'dynamoose';
import session, { SessionOptions } from 'express-session';
// import connectRedis from 'connect-redis';
import RedisStore from 'connect-redis';
import cors from 'cors';
import { GraphQLError } from 'graphql';
import { buildSchema } from './graphql/schema';
import { redisClient } from './redis';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';

// Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    userKey: string;
  }
}

const main = async () => {
  const dynamoDbEndpoint = 'http://localhost:8000';
  // const dynamoDbEndpoint = 'http://localstack.localhost.rktsvc.com:4566';
  dynamoose.aws.ddb.local(dynamoDbEndpoint);

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: (formattedError: GraphQLError) => formattedError, // custom validator can be applied here
    context: ({ req }: any) => ({ req }),
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'my-graph-id@my-graph-variant',
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({
            footer: false,
            embed: true,
            includeCookies: true,
          }),
    ],
  });

  const app = express();

  app.use(
    cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // 'Access-Control-Allow-Credentials',
      // origin: ['https://studio.apollographql.com'], // 'Access-Control-Allow-Origin',,
      // origin: 'http://localhost:4000/graphql',
      origin: '*',
    }),
  );

  app.use(
    session({
      // @ts-ignore
      store: new RedisStore({
        // @ts-ignore
        client: redisClient as any,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        sameSite: 'none',
      },
    }),
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
};

main();
