import { createClient } from 'redis';
// Utils
import { logger } from './utils/logger';



const redisClient = createClient();

redisClient.on('connect', () => logger.info('Cache is connecting'));
redisClient.on('ready', () => logger.info('Cache is ready'));
redisClient.on('end', () => logger.info('Cache disconnected'));
redisClient.on('reconnecting', () => logger.info('Cache is reconnecting'));
redisClient.on('error', (e) => logger.error(e));

(async() => {
        await redisClient.connect();
})()


export default redisClient;