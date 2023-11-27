// Redis
import redisClient  from '../../redis';
// Models
import { Poem } from './poem.model';
// Types
import { PoemType } from '../../interfaces/poem.interface';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';
export class PoemService {
  public async getAllWithPoetName(): Promise<PoemType[] | false> {
    const poems = await Poem.find(
      {},
      { intro: 1, poet: 1, verses: 1, reviewed: 1 },
    ).populate('poet', 'name');

    if (poems.length === 0) return false;
    return poems;
  }

  public async getAllIntrosWithPoetName(): Promise<PoemType[] | false> {
    const poems = await Poem.find(
      {},
      { intro: 1, poet: 1, reviewed: 1 },
    ).populate('poet', 'name');
    if (poems.length === 0) return false;
    return poems;
  }

  public async getOneWithPoet(id: string): Promise<PoemType | false> {
    let poem: PoemType | null;

    const cached = await redisClient.get(`poem:${id}`);
    if(cached) {
      poem = JSON.parse(cached);
    }
    else {
      poem = await Poem.findById(id, {
        intro: 1,
        poet: 1,
        verses: 1,
        reviewed: 1,
      }).populate('poet', ['name', 'bio', 'time_period']);
      
      await redisClient.set(`poem:${id}`, JSON.stringify(poem), { EX: 60*15 })
      .catch(err => logger.error(err))
    }

    if (!poem) return false;
    return poem;
  }

  public async post(poemData: PoemType): Promise<PoemType | false> {
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;

    const poem = new Poem({
      intro: poemData.intro,
      poet: poemData.poet,
      verses: poemData.verses,
      reviewed: poemData.reviewed,
    });
    const newPoem = await poem.save();
    if (!newPoem) return false;
    return newPoem;
  }

  public async postMany(
    poemsData: PoemType[],
  ): Promise<{newPoems: PoemType[], inValidPoems: PoemType[]} | false> {

    const isValid = async (poemData: PoemType) => await createSchema.isValid(poemData);
    const isNotValid = async (poemData: PoemType) => await createSchema.isValid(poemData) === false;


    const validPoems: PoemType[]  =  await filterAsync(poemsData, isValid)
    const inValidPoems: PoemType[]  =  await filterAsync(poemsData, isNotValid)

    const newPoems = await Poem.insertMany(validPoems);
    if (newPoems.length == 0) return false;

    const results = {newPoems, inValidPoems}
    return results;
  }

  public async update(
    id: string,
    poemData: PoemType,
  ): Promise<PoemType | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;

    const poem = await Poem.findById(id);
    if (!poem) return false;
    const newPoem = await poem.updateOne({ $set: poemData });
    if (!newPoem) return false;
    return newPoem;
  }

  public async remove(id: string): Promise<PoemType | false> {
    const poem = await Poem.findByIdAndRemove(id);
    if (!poem) return false;
    return poem;
  }
}
