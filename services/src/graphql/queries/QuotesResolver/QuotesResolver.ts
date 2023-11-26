import { DBService } from '../../../database/DBService';
import { Arg, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';
import { QuoteOutput } from '../../outputs/quote';

// @Service()
@Resolver()
export class QuotesResolver {
  dataService: DBService;

  constructor() {
    // this.dataService = new DBService(); // using the Container instance allows the use of a single instance across all classes
    this.dataService = Container.get(DBService);
  }

  @Query(() => [QuoteOutput])
  async quotesForUser(@Arg('userKey') userKey: string) {
    console.log('call getQuotes');
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
