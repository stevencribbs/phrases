import { Schema, model } from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class Phrase extends Item {
  userKey: string;
  phraseKey: string;
  text: string;
  author: string;
  phraseDate: string;
  tags: string[];
  reference: string;
  dateCreated: string;
  dateUpdated: string;
}

export const phraseSchema = new Schema({
  userKey: {
    type: String,
    hashKey: true,
  },
  phraseKey: {
    type: String,
    rangeKey: true,
  },
  text: String,
  author: String,
  phraseDate: String,
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

export const PhraseModel = model<Phrase>('phrases', phraseSchema);
