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
import { PhrasesContext } from './types/PhrasesContext';
import { ConfirmUserMutation } from './mutations/ConfirmUser/ConfirmUserMutation';
import { ForgotPasswordMutation } from './mutations/ForgotPassword/ForgotPasswordMutation';
import { ChangePasswordMutation } from './mutations/ChangePassword/ChangePasswordMutation';
import { LogoutMutation } from './mutations/Logout/Logout';

const checkScopes: typeGraphQL.AuthChecker<PhrasesContext> = (
  { root, args, context },
  requiredRoles,
) => {
  const { req } = context;

  // is the user logged in
  if (req.session.userKey) {
    return true;
  }
  return false;
};

export const buildSchema = async () => {
  return await typeGraphQL.buildSchema({
    resolvers: [
      MeResolver,
      PingResolver,
      PhraseQueries,
      UserQueries,
      CreatePhraseMutation,
      LoginMutation,
      LogoutMutation,
      DeletePhraseMutation,
      UpdatePhraseMutation,
      RegisterUserMutation,
      ConfirmUserMutation,
      ForgotPasswordMutation,
      ChangePasswordMutation,
    ],
    container: Container,
    // validate: { forbidUnknownValues: false },
    validate: true,
    authChecker: checkScopes,
  });
};
