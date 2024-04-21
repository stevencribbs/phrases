import { Resolver, Mutation, Arg } from 'type-graphql';
import Container, { Service } from 'typedi';

import { redisClient } from '../../../redis';
import { DBService } from '../../../database/DBService';
import { confirmUserPrefix } from '../../../graphql/constants/redisPrefixes';

@Service()
@Resolver()
export class ConfirmUserMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    console.log('Confirm User');
    if (process.env.USE_REDIS === 'yes') {
      const redisToken = confirmUserPrefix + token;
      const userKey = await redisClient!.get(redisToken);
      console.log({ token, userKey });
      if (!userKey) {
        return false;
      }

      const user = await this.dbService.getUser(userKey);
      if (!user?.email) {
        return false;
      }

      await this.dbService.updateUser(userKey, user!.email, {
        confirmed: true,
      });
      console.log('user updated');
      await redisClient!.del(redisToken);
      console.log('redis cleaned up');
    }
    return true;
  }
}
