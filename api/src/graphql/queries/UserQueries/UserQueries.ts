import { DBService } from '../../../database/DBService';
import { UserOutput } from '../../../graphql/outputs/user';
import { Authorized, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';

@Service()
@Resolver()
export class UserQueries {
  dataService: DBService;

  constructor() {
    this.dataService = Container.get(DBService);
  }

  @Authorized()
  @Query(() => [UserOutput])
  async getUsers() {
    const users = await this.dataService.getUsers();
    return users;
  }
}
