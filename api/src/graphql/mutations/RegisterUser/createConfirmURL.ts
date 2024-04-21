import { v4 as uuid } from 'uuid';
import { redisClient } from '../../../redis';
import { confirmUserPrefix } from '../../constants/redisPrefixes';

export const createConfirmationUrl = async (userKey: string) => {
  const token = uuid();
  // note: JWT token could be used here

  if (process.env.USE_REDIS === 'yes') {
    await redisClient!.set(
      confirmUserPrefix + token,
      userKey,
      'EX',
      60 * 60 * 24,
    ); // 1 day expiration
  }

  return `http://localhost:3000/user/confirm/${token}`;
};
