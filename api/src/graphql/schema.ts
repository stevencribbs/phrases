import 'reflect-metadata';
import * as typeGraphQL from 'type-graphql';
import { Container } from 'typedi';

import { PingResolver } from './queries/PingResolver';
import { PhraseQueries } from './queries/PhraseQueries';
import { CreatePhraseMutation } from './mutations/CreatePhrase/CreatePhraseMutation';
import { UpdatePhraseMutation } from './mutations/UpdatePhrase/UpdatePhraseMutation';
import { DeletePhraseMutation } from './mutations/DeletePhrase/DeletePhraseMutation';
import { UserQueries } from './queries/UserQueries';
import { RegisterUserMutation } from './mutations/RegisterUser/RegisterUserMutation';

export const buildSchema = async () => {
  return await typeGraphQL.buildSchema({
    resolvers: [
      PingResolver,
      PhraseQueries,
      UserQueries,
      CreatePhraseMutation,
      DeletePhraseMutation,
      UpdatePhraseMutation,
      RegisterUserMutation,
    ],
    container: Container,
    // validate: { forbidUnknownValues: false },
    validate: true,
    // authChecker: checkScopes,
  });
};
