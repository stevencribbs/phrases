import { User } from '../../database/models/User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType('User')
export class UserOutput implements Partial<User> {
  @Field()
  userKey: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  password: string;
}
