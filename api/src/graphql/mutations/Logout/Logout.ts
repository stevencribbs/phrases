import { Resolver, Mutation, Ctx } from 'type-graphql';
import { PhrasesContext } from '../../types/PhrasesContext';
import { Service } from 'typedi';

@Service()
@Resolver()
export class LogoutMutation {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: PhrasesContext): Promise<Boolean> {
    console.log('Logout');
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie('qid');
        return res(true);
      }),
    );
  }
}
