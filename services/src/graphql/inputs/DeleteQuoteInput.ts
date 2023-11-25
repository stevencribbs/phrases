import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteQuoteInput {
  @Field()
  @IsNotEmpty()
  userKey: string;

  @Field()
  @IsNotEmpty()
  quoteKey: string;
}
