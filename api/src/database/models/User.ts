import { Schema, model } from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class User extends Item {
  userKey: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateCreated: string;
  dateUpdated: string;
}

export const userSchema = new Schema({
  userKey: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    rangeKey: true,
  },
  firstName: String,
  lastName: String,
  password: String,
  dateCreated: {
    type: String,
    default: 'today',
  },
  dateUpdated: String,
});

export const UserModel = model<User>('users', userSchema);
