import { DBService } from '../../../database/DBService';
import { Arg, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';
import { PhraseOutput } from '../../outputs/phrase';

@Service()
@Resolver()
export class PhrasesResolver {
  dataService: DBService;

  constructor() {
    // this.dataService = new DBService(); // using the Container instance allows the use of a single instance across all classes
    this.dataService = Container.get(DBService);
  }

  @Query(() => [PhraseOutput])
  async phrasesForUser(@Arg('userKey') userKey: string) {
    console.log('call getPhrases');
    // try{
    // const userKey = 'u123';
    //TODO: validate userKey and return error if needed
    const phrases = await this.dataService.getPhrases(userKey);
    // }
    // catch (ex) {
    //   console.log({ex})
    // }
    //TODO: return should be an object with a 'data' property and lso handle for errors
    return phrases;
  }

  @Query(() => [PhraseOutput])
  async phrasesByType(
    @Arg('userKey') userKey: string,
    @Arg('phraseType') phraseType: string,
  ) {
    const phrases = await this.dataService.getPhrasesByType(
      userKey,
      phraseType,
    );
    return phrases;
  }
}
