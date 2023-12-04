import { IsArray, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePhraseInput {
  @Field()
  userKey: string;

  @Field()
  phraseKey: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
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
  @Length(1, 5)
  source?: string;
}
