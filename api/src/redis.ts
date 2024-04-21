import Redis from 'ioredis';

export const redisClient =
  process.env.USE_REDIS === 'yes' ? new Redis() : undefined;
