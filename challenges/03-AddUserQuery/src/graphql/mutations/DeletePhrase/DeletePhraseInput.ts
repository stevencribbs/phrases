import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DeletePhraseInput {
  @Field()
  @IsNotEmpty()
  userKey: string;

  @Field()
  @IsNotEmpty()
  phraseKey: string;
}
