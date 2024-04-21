import { Field, InputType } from 'type-graphql';
import { PasswordInput } from '../../../graphql/inputs/passwordInput';

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
