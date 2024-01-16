import { DBService } from '../../../database/DBService';
import { Arg, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';
import { PhraseOutput } from '../../outputs/phrase';

@Service()
@Resolver()
export class PhraseQueries {
  dataService: DBService;

  constructor() {
    // using the Container instance allows the use of a single instance across all classes
    this.dataService = Container.get(DBService);
  }

  @Query(() => [PhraseOutput])
  async phrasesForUser(@Arg('userKey') userKey: string) {
    const phrases = await this.dataService.getPhrases(userKey);
    return phrases;
  }

  // CHALLENGE TODO: Add a query to request phrases for a specific user by the 'phraseType'.
  // NOTE: The database servic already includes a function for retrieving phrases from the database by phraseType.
}
