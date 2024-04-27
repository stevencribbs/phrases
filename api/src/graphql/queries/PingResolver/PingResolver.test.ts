import { GraphQLArgs, graphql, print } from 'graphql';
import { gql } from 'graphql-tag';

import { buildSchema } from '../../schema';

describe('PingResolver', () => {
  test('it should pong', async () => {
    const query = gql`
      query Query($phrase: String) {
        ping(phrase: $phrase)
      }
    `;
    const schema = await buildSchema();
    const result = await graphql({
      schema,
      source: print(query),
      variableValues: { phrase: 'table tennis' },
    });
    expect(result).toEqual({
      data: { ping: `pong table tennis` },
    });
  });
});
