import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { UpdateQuoteInput } from './UpdateQuoteInput';
import { QuoteOutput } from '../../outputs/quote';

@Service()
@Resolver()
export class UpdateQuoteMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => QuoteOutput)
  async updateQuote(
    @Arg('quote')
    { userKey, quoteKey, author, text, tags, reference }: UpdateQuoteInput,
  ): Promise<QuoteOutput> {
    console.log('in updateQuote mutation');
    //TODO: userKey should come from context
    //try {
    const newQuote = await this.dbService.updateQuote(
      userKey,
      quoteKey,
      author,
      text,
      tags,
      reference,
    );
    return newQuote;
    // }
    // catch(error) {
    //   console.log({error});
    //   return;
    // }
  }
}
