import { IsAlphanumeric, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

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
  @IsEmailAlreadyExist() // NOTE: this is an example of a custom validator; though, not the best approach from a security standard
  email: string;

  @Field()
  password: string;
}
