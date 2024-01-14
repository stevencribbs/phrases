import { PhraseOutput } from '../../outputs/phrase';
import { Field, ObjectType } from 'type-graphql';

// export type CreatePhraseResult = PhraseCreatedOutput | ValidationError

@ObjectType()
export class PhraseCreatedOutput {
  @Field()
  phrase: PhraseOutput;
}
