import { Service } from 'typedi';
import { PhraseModel } from './models/Phrases';
import { v4 as uuid } from 'uuid';

@Service()
export class DBService {
  async getPhrases(userKey: string = 'u123') {
    const results = await PhraseModel.query('userKey').eq(userKey).exec();
    return results;
  }

  async getPhrasesByType(
    userKey: string = 'u123',
    phraseType: string = 'quote',
  ) {
    const results = await PhraseModel.query('userKey')
      .eq(userKey)
      .where('phraseType')
      .eq(phraseType)
      .exec();
    return results;
  }
}
