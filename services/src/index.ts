import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { PingResolver } from './graphql/queries/PingResolver';
import dynamoose from 'dynamoose';
import { QuotesResolver } from './graphql/queries/QuotesResolver';
import { CreateQuoteMutation } from './graphql/mutations/CreateQuote/CreateQuoteMutation';
import { UpdateQuoteMutation } from './graphql/mutations/UpdateQuote/UpdateQuoteMutation';
import { DeleteQuoteMutation } from './graphql/mutations/DeleteQuote/DeleteQuoteMutation';

const main = async () => {
  // const dynamoDbEndpoint = 'http://localhost:8000';
  const dynamoDbEndpoint = 'http://localstack.localhost.rktsvc.com:4566';
  dynamoose.aws.ddb.local(dynamoDbEndpoint);

  const schema = await buildSchema({
    resolvers: [
      PingResolver,
      QuotesResolver,
      CreateQuoteMutation,
      DeleteQuoteMutation,
      UpdateQuoteMutation,
    ],
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
