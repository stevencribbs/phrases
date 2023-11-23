
import { Quote } from '../../../database/models/Quotes';
import { DBService } from '../../../database/DBService';
import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@ObjectType('quote')
export class QuoteOutput implements Partial<Quote> {
  @Field()
  public userKey: string;

  @Field()
  public quoteKey: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public reference?: string;
}


@Service()
@Resolver()
export class QuotesResolver {
  private dataService: DBService;
  // constructor(private dataService: DBService) {}
  constructor() {
    this.dataService = new DBService();
  }

  @Query(() => [QuoteOutput])
  async quotesForUser(
    @Arg('userKey') userKey: string
  ) {
    console.log('call getQuotes')
    // try{
      // const userKey = 'u123';
      //TODO: validate userKey and return error if needed
      const quotes = await this.dataService.getQuotes(userKey);
    // }
    // catch (ex) {
    //   console.log({ex})
    // }
    //TODO: return should be an object with a 'data' property and lso handle for errors
    return quotes;
  }
}
