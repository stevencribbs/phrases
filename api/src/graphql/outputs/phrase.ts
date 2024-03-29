import { Phrase } from '../../database/models/Phrases';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Phrase')
export class PhraseOutput implements Partial<Phrase> {
  @Field(() => ID)
  public userKey: string;

  @Field()
  public phraseKey: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public phraseType?: string;

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public source?: string;
}

@ObjectType('DeletePhraseResult')
export class DeletePhraseResult {
  @Field()
  public result: string;
}
