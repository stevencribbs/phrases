import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';
import { DBService } from '../../../database/DBService';
import { UserOutput } from '../../../graphql/outputs/user';
import { PhrasesContext } from '../../../graphql/types/PhrasesContext';

@Service()
@Resolver()
export class LoginMutation {
  dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => UserOutput, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: PhrasesContext,
  ): Promise<UserOutput | null> {
    console.log('user login');
    const user = await this.dbService.getUserByEmail(email);

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    if (!user.confirmed) return null;
    

    console.log('user validated');
    ctx.req.session.userKey = user.userKey;
    console.log(ctx.req.session);
    return user;
  }
}
