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
import { LoginMutation } from './mutations/Login/Login';
import { MeResolver } from './queries/MeResolver/Me';

export const buildSchema = async () => {
  return await typeGraphQL.buildSchema({
    resolvers: [
      MeResolver,
      PingResolver,
      PhraseQueries,
      UserQueries,
      CreatePhraseMutation,
      LoginMutation,
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
