import { DBService } from '../../../database/DBService';
import { Arg, Mutation, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { RegisterUserInput } from './RegisterUserInput';
import { UserOutput } from '../../../graphql/outputs/user';

@Service()
@Resolver()
export class RegisterUserMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => UserOutput)
  async registerUser(
    @Arg('user')
    { firstName, lastName, email, password }: RegisterUserInput,
  ): Promise<UserOutput> {
    const user = this.dbService.registerUser(
      firstName,
      lastName,
      email,
      password,
    );
    return user;
  }
}
