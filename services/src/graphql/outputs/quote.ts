import { Quote } from '../../database/models/Quotes';
import { Field, ObjectType } from 'type-graphql';

@ObjectType('Quote')
export class QuoteOutput implements Partial<Quote> {
  @Field()
  public userKey: string;

  @Field()
  public quoteKey: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public reference?: string;
}
