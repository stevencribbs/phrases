import { PhraseOutput } from '../../outputs/phrase';
import { Field, ObjectType } from 'type-graphql';

// export type UpdatePhraseResult = PhraseUpdatedOutput | ValidationError

@ObjectType()
export class PhraseUpdatedOutput {
  @Field()
  phrase: PhraseOutput;
}
