import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dynamoose from 'dynamoose';
import { GraphQLError } from 'graphql';
import { buildSchema } from './graphql/schema';

const main = async () => {
  const dynamoDbEndpoint = 'http://localhost:8000';
  // const dynamoDbEndpoint = 'http://localstack.localhost.rktsvc.com:4566';
  dynamoose.aws.ddb.local(dynamoDbEndpoint);

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: (formattedError: GraphQLError) => formattedError, // custom validator can be applied here
  });

  const app = express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
};

main();
