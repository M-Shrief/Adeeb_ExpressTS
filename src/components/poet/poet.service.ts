// Redis
import redisClient from '../../redis';
// Models
import { Poet } from './poet.model';
import { Poem } from '../poem/poem.model';
import { ChosenVerse } from '../chosenVerse/chosenVerse.model';
import { Prose } from '../prose/prose.model';
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Schema
import { createSchema, updateSchema } from './poet.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';

export const PoetService = {
  async getAll(): Promise<PoetType['details'][] | false> {
    const poets = await Poet.find({}, { name: 1, time_period: 1 });
    if (poets.length === 0) return false;
    return poets;
  },

  async getOneWithLiterature(id: string): Promise<PoetType | false> {
    let poet: PoetType;
    const cached = await redisClient.get(`poet:${id}`);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
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
      if (!details) return false;

      poet = { details, poems, proses, chosenVerses };
      await redisClient
        .set(`poet:${id}`, JSON.stringify(poet), { EX: 60 * 15 })
        .catch((err) => logger.error(err));
    }

    return poet;
  },

  async post(
    poetData: PoetType['details'],
  ): Promise<PoetType['details'] | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;

    const poet = new Poet({
      name: poetData.name,
      time_period: poetData.time_period,
      bio: poetData.bio,
      reviewed: poetData.reviewed,
    });
    const newPoet = await poet.save();
    if (!newPoet) return false;
    return newPoet;
  },

  async postMany(
    poetsData: PoetType['details'][],
  ): Promise<
    | { newPoets: PoetType['details'][]; nonValidPoets: PoetType['details'][] }
    | false
  > {
    const isValid = async (poetData: PoetType['details']) =>
      await createSchema.isValid(poetData);
    const isNotValid = async (poetData: PoetType['details']) =>
      (await createSchema.isValid(poetData)) === false;

    const validPoets: PoetType['details'][] = await filterAsync(
      poetsData,
      isValid,
    );
    const nonValidPoets: PoetType['details'][] = await filterAsync(
      poetsData,
      isNotValid,
    );

    const newPoets = await Poet.insertMany(validPoets);
    if (newPoets.length == 0) return false;

    const results = { newPoets, nonValidPoets };
    return results;
  },

  async update(
    id: string,
    poetData: PoetType['details'],
  ): Promise<PoetType['details'] | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;
    const poet = await Poet.findById(id);
    if (!poet) return false;
    const newPoet = await poet.updateOne({ $set: poetData });
    if (!newPoet) return false;
    return newPoet;
  },

  async remove(id: string): Promise<PoetType['details'] | false> {
    const poet = await Poet.findByIdAndRemove(id);
    if (!poet) return false;
    return poet;
  },
};
