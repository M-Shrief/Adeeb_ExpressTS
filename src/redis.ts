import Cache from 'iovalkey'
// Utils
import { logger } from './utils/logger';
// Config
import { REDIS } from './config';



const redisClient = REDIS
? new Cache(REDIS)
: new Cache();

redisClient.on('connect', () => logger.info('Cache is connecting'));
redisClient.on('ready', () => logger.info('Cache is ready'));
redisClient.on('end', () => logger.info('Cache disconnected'));
redisClient.on('reconnecting', (o: any) => logger.info(`Cache is reconnecting: ${o.attempt} attempts.`));
redisClient.on('error', (err) => logger.error(`Cache error: ${err}`));


// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
    await redisClient.disconnect();
    logger.info('Redis default connection disconnected through app termination');
});

export default redisClient;