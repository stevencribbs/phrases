import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class PingResolver {
  @Query(() => String)
  ping(@Arg('phrase', { nullable: true }) phrase: string) {
    return `pong ${phrase}`;
  }
}
