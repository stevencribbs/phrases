import { Resolver, Mutation, Arg } from 'type-graphql';
import { v4 as uuid } from 'uuid';

import { sendEmail } from '../../utils/sendEmail';
import { redisClient } from '../../../redis';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';

@Service()
@Resolver()
export class ForgotPasswordMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => String)
  async forgotPassword(@Arg('email') email: string): Promise<string> {
    if (process.env.USE_REDIS === 'yes') {
      const user = await this.dbService.getUserByEmail(email);
      if (!user) {
        return 'true';
      }

      const token = uuid();
      await redisClient!.set(
        forgotPasswordPrefix + token,
        user.userKey,
        'EX',
        60 * 60 * 24,
      ); // 1 day expiration

      await sendEmail(
        email,
        `http://localhost:3000/user/change-password/${token}`,
      );
      return token;
    }
    return 'true';
  }
}
