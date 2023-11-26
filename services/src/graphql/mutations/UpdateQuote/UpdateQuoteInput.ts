import { IsArray, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateQuoteInput {
  @Field()
  userKey: string;

  @Field()
  quoteKey: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @MaxLength(20, {
    each: true,
  })
  tags?: string[];

  @Field({ nullable: true })
  reference?: string;
}
