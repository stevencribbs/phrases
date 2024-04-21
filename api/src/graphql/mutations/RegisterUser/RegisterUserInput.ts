import { IsAlphanumeric, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';
import { PasswordInput } from '../../../graphql/inputs/passwordInput';

@InputType()
export class RegisterUserInput extends PasswordInput {
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
}
