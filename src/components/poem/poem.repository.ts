// Redis
import redisClient from '../../redis';
// Models
import { Poem } from './poem.model';
// Types
import { PoemType } from '../../interfaces/poem.interface';
import { Logger } from 'winston';
// Utils
import { logger } from '../../utils/logger';

export const PoemDB = {
    async getAllWithPoetName(): Promise<PoemType[]> {
      return await Poem.find(
        {},
        { intro: 1, poet: 1, verses: 1, reviewed: 1 },
      ).populate('poet', 'name');
    },
  
    async getAllIntrosWithPoetName(): Promise<PoemType[]> {
      return await Poem.find(
        {},
        { intro: 1, poet: 1, reviewed: 1 },
      ).populate('poet', 'name');
    },
  
    async getOneWithPoet(id: string): Promise<PoemType | null> {
        return await Poem.findById(id, {
          intro: 1,
          poet: 1,
          verses: 1,
          reviewed: 1,
        }).populate('poet', ['name', 'bio', 'time_period']);
    },
  
    async post(poemData: PoemType): Promise<PoemType> {
      const poem = new Poem({
        intro: poemData.intro,
        poet: poemData.poet,
        verses: poemData.verses,
        reviewed: poemData.reviewed,
      });
      return await poem.save();
    },
  
    async postMany(
      poemsData: PoemType[],
    ): Promise< PoemType[]> {
      return await Poem.insertMany(poemsData);
    },
  
    async update(id: string, poemData: PoemType): Promise<PoemType | null> {
      return await Poem.findByIdAndUpdate(id, { $set: poemData });
    },
  
    async remove(id: string): Promise<PoemType | null> {
      return await Poem.findByIdAndRemove(id);
    },
  };


export const PoemRedis = {
    async get(id: string): Promise<string | null> {
      return await redisClient.get(`poem:${id}`);
    },
    async set(id: string, poem: PoemType): Promise<string | Logger | null> {
      return await redisClient
        .set(`poem:${id}`, JSON.stringify(poem), "EX", 60 * 15 )
        .catch((err) => logger.error(`CacheError: couldn't cache poem:${id}`));
    },
    async exists(id: string): Promise<number> {
      return await redisClient.exists(`poem:${id}`)
    },
    async delete(id: string): Promise<number> {
      return await redisClient.del(`poem:${id}`)
    }
};
  