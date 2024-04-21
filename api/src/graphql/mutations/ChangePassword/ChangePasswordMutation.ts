import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { DBService } from '../../../database/DBService';
import { redisClient } from '../../../redis';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { ChangePasswordInput } from './ChangePasswordInput';
import { PhrasesContext } from '../../types/PhrasesContext';
import { UserOutput } from '../../../graphql/outputs/user';
import Container, { Service } from 'typedi';

@Service()
@Resolver()
export class ChangePasswordMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => UserOutput, { nullable: true })
  async changePassword(
    @Arg('data')
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: PhrasesContext,
  ): Promise<UserOutput | null> {
    if (process.env.USE_REDIS === 'yes') {
      const redisToken = forgotPasswordPrefix + token;
      const userKey = await redisClient!.get(redisToken);

      if (!userKey) {
        return null;
      }
      const user = await this.dbService.getUser(userKey);

      if (!user) {
        return null;
      }

      await redisClient!.del(redisToken);

      const newPassword = await bcrypt.hash(password, 12);

      await this.dbService.updateUser(user.userKey, user.email, {
        password: newPassword,
      });

      ctx.req.session!.userKey = user.userKey;

      return user;
    } else return null;
  }
}
