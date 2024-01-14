import { GraphQLError } from 'graphql';
import { Field, ObjectType, createUnionType } from 'type-graphql';

// export type CreatePhraseResult = PhraseCreatedOutput | ValidationError
export const DeletePhraseResult = createUnionType({
  name: 'DeletePhraseResult',
  types: () => [PhraseDeletedOutput, GQLError] as const,
});

@ObjectType('PhraseDeletedOutput')
export class PhraseDeletedOutput {
  @Field()
  public result: string;
}

@ObjectType('GQLError')
export class GQLError implements Partial<GraphQLError> {
  @Field()
  public message: string;
}
