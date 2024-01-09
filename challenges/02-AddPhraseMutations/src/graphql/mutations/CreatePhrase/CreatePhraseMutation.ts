import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { CreatePhraseInput } from './CreatePhraseInput';
import { PhraseCreatedOutput } from './CreatePhraseResult';

@Service()
@Resolver()
export class CreatePhraseMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => PhraseCreatedOutput)
  async createPhrase(
    @Arg('phrase')
    { userKey, author, phraseType, text, tags, source }: CreatePhraseInput,
  ): Promise<PhraseCreatedOutput> {
    console.log('in createPhrase mutation');
    const newPhrase = await this.dbService.createPhrase(
      userKey,
      author,
      phraseType,
      text,
      tags,
      source,
    );
    return { phrase: newPhrase };
  }
}
