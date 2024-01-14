import { IsAlpha, IsArray, Length, Max, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePhraseInput {
  @Field()
  userKey: string;

  @Field()
  phraseKey: string;

  @Field({ nullable: true })
  @IsAlpha()
  author?: string;

  @Field({ nullable: true })
  phraseType?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @MaxLength(20, { each: true })
  tags?: string[];

  @Field({ nullable: true })
  source?: string;
}
