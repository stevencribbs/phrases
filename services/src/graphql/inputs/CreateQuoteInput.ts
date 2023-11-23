import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateQuoteInput {
  @Field()
  userKey: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  reference?: string;
}
