import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { PingResolver } from './graphql/queries/PingResolver';
import dynamoose from 'dynamoose';
import { PhrasesResolver } from './graphql/queries/PhrasesResolver';
import { CreatePhraseMutation } from './graphql/mutations/CreatePhrase/CreatePhraseMutation';
import { UpdatePhraseMutation } from './graphql/mutations/UpdatePhrase/UpdatePhraseMutation';
import { DeletePhraseMutation } from './graphql/mutations/DeletePhrase/DeletePhraseMutation';
import { GraphQLError } from 'graphql';

const main = async () => {
  // const dynamoDbEndpoint = 'http://localhost:8000';
  const dynamoDbEndpoint = 'http://localstack.localhost.rktsvc.com:4566';
  dynamoose.aws.ddb.local(dynamoDbEndpoint);

  const schema = await buildSchema({
    resolvers: [
      PingResolver,
      PhrasesResolver,
      CreatePhraseMutation,
      DeletePhraseMutation,
      UpdatePhraseMutation,
    ],
    validate: true,
  });

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
