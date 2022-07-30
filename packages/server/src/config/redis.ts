import { createClient } from 'redis';

import { REDIS_URI } from './environment';

const redisClient = createClient({
  url: REDIS_URI,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(error.message);
    await new Promise((res) => setTimeout(res, 15000));
  }
};

connectRedis();

redisClient.on('connect', () =>
  console.log('Redis client connected successfully')
);

redisClient.on('error', (err) => console.error(err));

export default redisClient;
