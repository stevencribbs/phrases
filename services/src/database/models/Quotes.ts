import { Schema, model } from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class Quote extends Item {
  userKey: string;
  quoteKey: string;
  text: string;
  author: string;
  quoteDate: string;
  tags: string[];
  reference: string;
  dateCreated: string;
  dateUpdated: string;
}

export const quoteSchema = new Schema({
  userKey: {
    type: String,
    hashKey: true,
  },
  quoteKey: {
    type: String,
    rangeKey: true,
  },
  text: String,
  author: String,
  quoteDate: String,
  reference: String,
  tags: {
    type: Array,
    schema: [String],
  },
  dateCreated: {
    type: String,
    default: 'today',
  },
  dateUpdated: String,
});

export const QuoteModel = model<Quote>('quotes', quoteSchema);
