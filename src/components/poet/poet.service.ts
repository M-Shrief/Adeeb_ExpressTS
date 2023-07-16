// Redis
import redisClient  from '../../redis'
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
export class PoetService {
  public async getAll(): Promise<{isCached: boolean, poets: PoetType['details'][]} | false> {
    let poets: PoetType['details'][], isCached = false;

    const cacheResults = await redisClient.get('poets');
    if(cacheResults) {
      isCached = true;
      poets = JSON.parse(cacheResults);
    } else {
      poets = await Poet.find({}, { name: 1, time_period: 1 });
      await redisClient.set('poets', JSON.stringify(poets),  { EX: 60*60 })
      .catch(err => logger.error(err))
    }
      
    if (poets.length === 0) return false;
    return {isCached, poets};
  }

  public async getOneWithLiterature(id: string): Promise<{isCached: boolean, poet: PoetType} | false> {
    let poet: PoetType, isCached = false;
    const cacheResults = await redisClient.get(`poet:${id}`);
    if(cacheResults) {
      isCached = true;
      poet = JSON.parse(cacheResults);
    } else {
      const [details, authoredPoems, authoredProses, authoredChosenVerses] =
      await Promise.all([
        Poet.findById(id, { name: 1, bio: 1, time_period: 1 }),
        Poem.find({ poet: id }, { intro: 1, reviewed: 1 }),
        Prose.find({ poet: id }, { tags: 1, qoute: 1 }),
        ChosenVerse.find(
          { poet: id },
          { reviewed: 1, tags: 1, verses: 1, poem: 1 },
        ),
      ]);
      if (!details) return false;
      poet = {details, authoredPoems, authoredProses, authoredChosenVerses};
      await redisClient.set(`poet:${id}`, JSON.stringify(poet),  { EX: 60*60 })
      .catch(err => logger.error(err))
    }

    return {isCached, poet};
  }

  public async post(
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
  }

  public async postMany(
    poetsData: PoetType['details'][],
    ): Promise<{newPoets: PoetType['details'][], nonValidPoets: PoetType['details'][]} | false> {

      const isValid = async (poetData: PoetType['details']) => await createSchema.isValid(poetData);
      const isNotValid = async (poetData: PoetType['details']) => await createSchema.isValid(poetData) === false;
  
  
      const validPoets: PoetType['details'][]  =  await filterAsync(poetsData, isValid)
      const nonValidPoets: PoetType['details'][]  =  await filterAsync(poetsData, isNotValid)
  
      const newPoets = await Poet.insertMany(validPoets, {limit: 10});
      if (newPoets.length == 0) return false;
  
      const results = {newPoets, nonValidPoets}
      return results;
    }

  public async update(
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
  }

  public async remove(id: string): Promise<PoetType['details'] | false> {
    const poet = await Poet.findByIdAndRemove(id);
    if (!poet) return false;
    return poet;
  }
}
