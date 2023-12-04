import { Type } from 'class-transformer';
import { IsArray, MaxLength, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePhraseInput {
  @Field()
  userKey: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true, defaultValue: 'quote' })
  phraseType?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @MaxLength(20, {
    each: true,
  })
  tags?: string[];

  @Field({ nullable: true })
  source?: string;
}
