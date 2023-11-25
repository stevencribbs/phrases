import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import { Service } from 'typedi';
import { DeleteQuoteInput } from '../../inputs/DeleteQuoteInput';
import { DeleteQuoteResult } from '../../outputs/quote';

@Service()
@Resolver()
export class DeleteQuoteMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = new DBService();
  }

  @Mutation(() => DeleteQuoteResult)
  async deleteQuote(
    @Arg('deleteQuoteInput')
    { userKey, quoteKey }: DeleteQuoteInput,
  ): Promise<DeleteQuoteResult> {
    console.log('in deleteQuote mutation');
    //TODO: userKey should come from context
    //try {
    const result = await this.dbService.deleteQuote(userKey, quoteKey);
    return { result };
    // }
    // catch(error) {
    //   console.log({error});
    //   return;
    // }
  }
}
