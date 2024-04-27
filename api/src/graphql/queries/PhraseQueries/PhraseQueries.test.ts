import { GraphQLArgs, graphql, print } from 'graphql';
import { gql } from 'graphql-tag';

import { buildSchema } from '../../schema';

describe('PhraseQueries', () => {
  test('it should return phrase for a user', async () => {
    const query = gql`
      query Query($userKey: String!) {
        phrasesForUser(userKey: $userKey) {
          userKey
          author
        }
      }
    `;
    const schema = await buildSchema();
    const result = await graphql({
      schema,
      source: print(query),
      variableValues: { userKey: 'u123' },
    });
    expect(result).toEqual({
      data: {
        phrasesForUser: [
          {
            userKey: 'u123',
            author: 'William',
          },
        ],
      },
    });
  });
});
