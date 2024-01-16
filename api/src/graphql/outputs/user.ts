import { User } from '../../database/models/User';
import { Field, ObjectType, Root } from 'type-graphql';

@ObjectType('User')
export class UserOutput implements Partial<User> {
  @Field()
  userKey: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  name?(@Root() parent: UserOutput): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  email: string;

  password: string;
}
