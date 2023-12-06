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
    const updatedPhrase = await PhraseModel.update(
      { userKey, phraseKey },
      {
        ...(author && { author }),
        ...(phraseType && { phraseType }),
        ...(text && { text }),
        ...(tags && { tags }),
        ...(source && { source }),
      },
    );

    return updatedPhrase;
  }

  async deletePhrase(userKey: string, phraseKey: string) {
    try {
      await PhraseModel.delete({ userKey, phraseKey });
      return `Successfully deleted phrase ${phraseKey}`;
    } catch (ex) {
      return ex.message;
    }
  }
}
