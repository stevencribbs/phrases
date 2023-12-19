import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { UpdatePhraseInput } from './UpdatePhraseInput';
import { PhraseUpdatedOutput } from './UpdatePhraseResult';

@Service()
@Resolver()
export class UpdatePhraseMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => PhraseUpdatedOutput)
  async updatePhrase(
    @Arg('phrase')
    {
      userKey,
      phraseKey,
      author,
      phraseType,
      text,
      tags,
      source,
    }: UpdatePhraseInput,
  ): Promise<PhraseUpdatedOutput> {
    console.log('in updatePhrase mutation');
    //TODO: userKey should come from context
    const newPhrase = await this.dbService.updatePhrase(
      userKey,
      phraseKey,
      author,
      phraseType,
      text,
      tags,
      source,
    );
    return { phrase: newPhrase };
  }
}
