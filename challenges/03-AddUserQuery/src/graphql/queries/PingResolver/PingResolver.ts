import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class PingResolver {
  @Query(() => String)
  ping() {
    return 'pong';
  }
}
