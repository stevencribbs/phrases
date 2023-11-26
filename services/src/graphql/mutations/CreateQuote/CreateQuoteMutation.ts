import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { CreateQuoteInput } from './CreateQuoteInput';
import { QuoteOutput } from '../../outputs/quote';

@Service()
@Resolver()
export class CreateQuoteMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
    // this.dbService.initializeQuotesDatabase();
    // this.dbService.addSeedData();
  }

  @Mutation(() => QuoteOutput)
  async createQuote(
    @Arg('quote')
    { userKey, author, text, tags, reference }: CreateQuoteInput,
  ): Promise<QuoteOutput> {
    console.log('in createQuote mutation');
    //TODO: userKey should come from context
    //try {
    const newQuote = await this.dbService.createQuote(
      userKey,
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
