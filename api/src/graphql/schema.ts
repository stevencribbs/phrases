import 'reflect-metadata';
import * as typeGraphQL from 'type-graphql';
import { Container } from 'typedi';

import { buildSchema as TGBuildSchema } from 'type-graphql';
import { PingResolver } from './queries/PingResolver';
import { PhrasesResolver } from './queries/PhrasesResolver';
import { CreatePhraseMutation } from './mutations/CreatePhrase/CreatePhraseMutation';
import { UpdatePhraseMutation } from './mutations/UpdatePhrase/UpdatePhraseMutation';
import { DeletePhraseMutation } from './mutations/DeletePhrase/DeletePhraseMutation';

export const buildSchema = async () => {
  return await typeGraphQL.buildSchema({
    resolvers: [
      PingResolver,
      PhrasesResolver,
      CreatePhraseMutation,
      DeletePhraseMutation,
      UpdatePhraseMutation,
    ],
    container: Container,
    // validate: { forbidUnknownValues: false },
    validate: true,
  });
};
