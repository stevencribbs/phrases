import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { DeletePhraseInput } from './DeletePhraseInput';
import { DeletePhraseResult } from '../../outputs/phrase';

@Service()
@Resolver()
export class DeletePhraseMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = Container.get(DBService);
  }

  @Mutation(() => DeletePhraseResult)
  async deletePhrase(
    @Arg('deletePhraseInput')
    { userKey, phraseKey }: DeletePhraseInput,
  ): Promise<DeletePhraseResult> {
    console.log('in deletePhrase mutation');
    //TODO: userKey should come from context
    //try {
    const result = await this.dbService.deletePhrase(userKey, phraseKey);
    return { result };
    // }
    // catch(error) {
    //   console.log({error});
    //   return;
    // }
  }
}
