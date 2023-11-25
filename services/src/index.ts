import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express'; // TODO: fix linting for single quotes
import express from 'express';
import { buildSchema } from 'type-graphql';
import { PingResolver } from './graphql/queries/PingResolver';
import dynamoose from 'dynamoose';
import { QuotesResolver } from './graphql/queries/QuotesResolver';
import { CreateQuoteMutation } from './graphql/mutations/CreateQuote/CreateQuoteMutation';

const main = async () => {
  // const dynamoDbEndpoint = 'http://localhost:8000';
  const dynamoDbEndpoint = 'http://localstack.localhost.rktsvc.com:4566';
  dynamoose.aws.ddb.local(dynamoDbEndpoint);

  const schema = await buildSchema({
    resolvers: [PingResolver, QuotesResolver, CreateQuoteMutation],
    validate: true,
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
};

main();
