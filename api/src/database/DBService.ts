import { Service } from 'typedi';
import * as dynamoose from 'dynamoose';
import { PhraseModel } from './models/Phrases';
import { v4 as uuid } from 'uuid';

@Service()
export class DBService {
  async getPhrases(userKey: string = 'u123') {
    const results = await PhraseModel.query('userKey').eq(userKey).exec();
    return results;
  }

  async createPhrase(
    userKey: string,
    author?: string,
    text?: string,
    tags?: string[],
    reference?: string,
  ) {
    const newPhraseKey: string = uuid();
    const result = await PhraseModel.create({
      userKey,
      phraseKey: newPhraseKey,
      author,
      text,
      tags,
      reference,
    });
    return result;
  }

  async updatePhrase(
    userKey: string,
    phraseKey: string,
    author?: string,
    text?: string,
    tags?: string[],
    reference?: string,
  ) {
    const updatedPhrase = await PhraseModel.update(
      { userKey, phraseKey },
      {
        ...(author && { author }),
        ...(text && { text }),
        ...(tags && { tags }),
        ...(reference && { reference }),
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

  async initializePhrasesDatabase() {
    const DynamoTable = new dynamoose.Table('phrases', [PhraseModel]);
    try {
      const request = await DynamoTable.create({ return: 'request' });
      console.log('DynamoTable create request object:', request);
    } catch (error) {
      console.error(error);
    }
  }

  async addSeedData() {
    const phraseData = [
      {
        author: 'Albert Einstein',
        text: 'Failure is success in progress.',
        tags: ['Inspiration', 'Persistence'],
      },
      {
        author: 'Vincent Van Gogh',
        text: 'Great things are not done by impulse, but by a series of small things brought together.',
        tags: ['Inspiration', 'Persistence'],
      },
      {
        author: 'Thomas Jefferson',
        text: 'Opportunity is missed by most people because it is dressed in overalls and looks like work.',
        tags: ['Inspiration', 'Determination'],
      },
      {
        author: 'Mark Twain',
        text: "Why not go out on a limb? That's where the fruit is.",
        tags: ['Inspiration'],
      },
      {
        author: 'William James',
        text: 'It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.',
        tags: ['Inspiration', 'Positivity'],
      },
    ];

    const userKey = 'u7147';
    phraseData.map((phrase) => {
      try {
        this.createPhrase(userKey, phrase.author, phrase.text, phrase.tags);
      } catch (error) {
        console.log({ error });
      }
    });
  }
}
