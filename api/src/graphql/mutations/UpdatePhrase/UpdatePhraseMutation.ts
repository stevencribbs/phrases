import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { UpdatePhraseInput } from './UpdatePhraseInput';
import { PhraseOutput } from '../../outputs/phrase';

@Service()
@Resolver()
export class UpdatePhraseMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => PhraseOutput)
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
  ): Promise<PhraseOutput> {
    console.log('in updatePhrase mutation');
    //TODO: userKey should come from context
    //try {
    const newPhrase = await this.dbService.updatePhrase(
      userKey,
      phraseKey,
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
