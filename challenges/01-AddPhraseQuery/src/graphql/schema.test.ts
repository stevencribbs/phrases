import { printSchema } from 'graphql';

import { buildSchema } from './schema';

describe('Service schema', () => {
  test('It should only change intentionally', async () => {
    const schema = await buildSchema();
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
