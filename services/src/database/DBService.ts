import { Service } from 'typedi';
import * as dynamoose from 'dynamoose';
import { QuoteModel } from './models/Quotes';
import { v4 as uuid } from 'uuid';

@Service()
export class DBService {
  async getQuotes(userKey: string = 'u123') {
    const results = await QuoteModel.query('userKey').eq(userKey).exec();
    return results;
  }

  async createQuote(
    userKey: string,
    author?: string,
    text?: string,
    tags?: string[],
    reference?: string,
  ) {
    const newQuoteKey: string = uuid();
    const result = await QuoteModel.create({
      userKey,
      quoteKey: newQuoteKey,
      author,
      text,
      tags,
      reference,
    });
    return result;
  }

  async initializeQuotesDatabase() {
    const DynamoTable = new dynamoose.Table('quotes', [QuoteModel]);
    try {
      const request = await DynamoTable.create({ return: 'request' });
      console.log('DynamoTable create request object:', request);
    } catch (error) {
      console.error(error);
    }
  }

  async addSeedData() {
    const quoteData = [
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
    ];

    const userKey = 'u7147';
    quoteData.map((quote) => {
      try {
        this.createQuote(userKey, quote.author, quote.text, quote.tags);
      } catch (error) {
        console.log({ error });
      }
    });
  }
}
