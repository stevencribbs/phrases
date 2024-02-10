import { Resolver, Query, Ctx } from 'type-graphql';

import { UserOutput } from '../../../graphql/outputs/user';
import { PhrasesContext } from '../../../graphql/types/PhrasesContext';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';

@Service()
@Resolver()
export class MeResolver {
  dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Query(() => UserOutput, { nullable: true })
  async me(@Ctx() ctx: PhrasesContext): Promise<UserOutput | undefined> {
    console.log(ctx.req.session);
    if (!ctx.req.session!.userKey) {
      return undefined;
    }
    const user = await this.dbService.getUser(ctx.req.session.userKey);

    return user ?? undefined;
  }
}
