import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';

// Other validators are described at https://github.com/typestack/class-validator#validation-decorators
@InputType()
export class CreatePhraseInput {
  @Field()
  userKey: string;

  @Field()
  phraseType: string;

  @Field({ nullable: true })
  @ValidateIf((phrase) => {
    return phrase.author && phrase.author.length != 0;
  })
  // @IsEmpty()
  @IsAlpha()
  author?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  text?: string;

  @Field(() => [String], { nullable: true })
  @MaxLength(20, { each: true })
  @MinLength(2, { each: true })
  @IsArray()
  tags?: string[];

  @Field({ nullable: true })
  source?: string;
}
