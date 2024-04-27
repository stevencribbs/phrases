import { Service } from 'typedi';

@Service()
export class DBService {
  getPhrases = jest.fn(async (userKey) => {
    const phrases = [
      {
        userKey,
        author: 'William',
      },
    ];
    return phrases;
  });
}
