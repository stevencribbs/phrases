import { Arg, Mutation, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import Container, { Service } from 'typedi';
import { DeletePhraseInput } from './DeletePhraseInput';
import { DeletePhraseResult, PhraseDeletedOutput } from './DeletePhraseResult';

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
  ): Promise<typeof DeletePhraseResult> {
    console.log('in deletePhrase mutation');
    const result = await this.dbService.deletePhrase(userKey, phraseKey);
    console.log(`deletePhrase returned: ${result}`);

    const resultOutput = new PhraseDeletedOutput();
    resultOutput.result = result;

    return resultOutput;
  }
}
