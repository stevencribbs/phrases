import { IsAlphanumeric, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsAlphanumeric()
  firstName: string;

  @Field()
  @IsAlphanumeric()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
