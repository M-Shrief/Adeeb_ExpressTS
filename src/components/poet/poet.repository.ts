// Redis
import redisClient from '../../redis';
// Models
import { Poet } from './poet.model';
import { Poem } from '../poem/poem.model';
import { ChosenVerse } from '../chosenVerse/chosenVerse.model';
import { Prose } from '../prose/prose.model';
// Types
import { PoetType } from '../../interfaces/poet.interface';
import { Logger } from 'winston';
// Utils
import { logger } from '../../utils/logger';

export const PoetDB = {
  async getAll(): Promise<PoetType['details'][]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  },

  async getOneWithLiterature(id: string): Promise<PoetType | null> {
    const [details, poems, proses, chosenVerses] = await Promise.all([
      Poet.findById(id, { name: 1, bio: 1, time_period: 1 }),
      Poem.find({ poet: id }, { intro: 1, reviewed: 1 }),
      Prose.find({ poet: id }, { tags: 1, qoute: 1 }),
      ChosenVerse.find(
        { poet: id },
        { reviewed: 1, tags: 1, verses: 1, poem: 1 },
      ),
    ]);
    // check if Poet exists, not checking for his Poems,... because it'll be an empty Array.
    if (!details) return null;
    return  { details, poems, proses, chosenVerses };
  },

  async post(poetData: PoetType['details']): Promise<PoetType['details']> {
    const poet = new Poet({
      name: poetData.name,
      time_period: poetData.time_period,
      bio: poetData.bio,
      reviewed: poetData.reviewed,
    });
    return await poet.save();
  },

  async postMany(
    poetsData: PoetType['details'][],
  ): Promise<PoetType['details'][]> {
    return await Poet.insertMany(poetsData);
  },

  async update(
    _id: string,
    poetData: PoetType['details'],
  ): Promise<PoetType['details'] | null> {
    return await Poet.findByIdAndUpdate(_id, { $set: poetData });
  },

  async remove(id: string): Promise<PoetType['details'] | null> {
    return await Poet.findByIdAndRemove(id);
  },
};

export const PoetRedis = {
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poet:${id}`);
  },
  async set(id: string, poet: PoetType): Promise<string | Logger | null> {
    return await redisClient
      .set(`poet:${id}`, JSON.stringify(poet), { EX: 60 * 15 })
      .catch((err) => logger.error(`CacheError: couldn't cache poet:${id}`));
  },
};
