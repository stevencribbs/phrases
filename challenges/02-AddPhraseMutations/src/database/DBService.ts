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

  async createPhrase(
    userKey: string,
    author?: string,
    phraseType?: string,
    text?: string,
    tags?: string[],
    source?: string,
  ) {
    const newPhraseKey: string = uuid();
    const result = await PhraseModel.create({
      userKey,
      phraseKey: newPhraseKey,
      author,
      phraseType,
      text,
      tags,
      source,
    });
    return result;
  }

  async updatePhrase(
    userKey: string,
    phraseKey: string,
    author?: string,
    phraseType?: string,
    text?: string,
    tags?: string[],
    source?: string,
  ) {
    const updatedPhrase = {};

    // TODO: use the PhraseModel.update function to update the phrase in database.
    // NOTE: the fields to update are optional; if they are not provided, they should
    //       not be overwritten in the database.

    return updatedPhrase;
  }

  async deletePhrase(userKey: string, phraseKey: string) {
    try {
      // TODO: use the PhraseModel.delete function to delete the phrase from the database.
      // NOTE: the return value should be a status message indicating the results of the delete.

      return '';
    } catch (ex) {
      return ex.message;
    }
  }
}
