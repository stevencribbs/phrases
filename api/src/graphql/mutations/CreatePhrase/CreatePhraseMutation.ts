import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { CreatePhraseInput } from './CreatePhraseInput';
import { PhraseOutput } from '../../outputs/phrase';

// @Service()
@Resolver()
export class CreatePhraseMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
    // this.dbService.initializePhrasesDatabase();
    // this.dbService.addSeedData();
  }

  @Mutation(() => PhraseOutput)
  async createPhrase(
    @Arg('phrase')
    { userKey, author, phraseType, text, tags, source }: CreatePhraseInput,
  ): Promise<PhraseOutput> {
    console.log('in createPhrase mutation');
    //TODO: userKey should come from context
    //try {
    const newPhrase = await this.dbService.createPhrase(
      userKey,
      author,
      phraseType,
      text,
      tags,
      source,
    );
    return newPhrase;
    // }
    // catch(error) {
    //   console.log({error});
    //   return;
    // }
  }
}
