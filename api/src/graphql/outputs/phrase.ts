import { Phrase } from '../../database/models/Phrases';
import { Field, ObjectType } from 'type-graphql';

@ObjectType('Phrase')
export class PhraseOutput implements Partial<Phrase> {
  @Field()
  public userKey: string;

  @Field()
  public phraseKey: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public reference?: string;
}

@ObjectType('DeletePhraseResult')
export class DeletePhraseResult {
  @Field()
  public result: string;
}
