import 'reflect-metadata';
import * as typeGraphQL from 'type-graphql';
import { Container } from 'typedi';

import { PingResolver } from './queries/PingResolver';
import { PhraseQueries } from './queries/PhraseQueries';

export const buildSchema = async () => {
  return await typeGraphQL.buildSchema({
    resolvers: [PingResolver, PhraseQueries],
    container: Container,
    // validate: { forbidUnknownValues: false },
    validate: true,
  });
};
