// Repository
import {PoemDB, PoemRedis} from './poem.repository'
// Types
import { PoemType } from '../../interfaces/poem.interface';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';

export const PoemService = {
  async getAllWithPoetName(): Promise<PoemType[] | false> {
    const poems = await PoemDB.getAllWithPoetName()
    if (poems.length === 0) return false;
    return poems;
  },

  async getAllIntrosWithPoetName(): Promise<PoemType[] | false> {
    const poems = await PoemDB.getAllIntrosWithPoetName()
    if (poems.length === 0) return false;
    return poems;
  },

  async getOneWithPoet(id: string): Promise<PoemType | false> {
    let poem: PoemType | null;

    const cached = await PoemRedis.get(id);
    if (cached) {
      poem = JSON.parse(cached);
    } else {
      poem = await PoemDB.getOneWithPoet(id);
    }

    if (!poem) return false;
    await PoemRedis.set(id, poem)
    return poem;
  },

  async post(poemData: PoemType): Promise<PoemType | false> {
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;
    const newPoem = await PoemDB.post(poemData)
    if (!newPoem) return false;
    return newPoem;
  },

  async postMany(
    poemsData: PoemType[],
  ): Promise<{ newPoems: PoemType[]; inValidPoems: PoemType[] } | false> {
    const isValid = async (poemData: PoemType) =>
      await createSchema.isValid(poemData);
    const isNotValid = async (poemData: PoemType) =>
      (await createSchema.isValid(poemData)) === false;

    const validPoems: PoemType[] = await filterAsync(poemsData, isValid);
    const inValidPoems: PoemType[] = await filterAsync(poemsData, isNotValid);

    const newPoems = await PoemDB.postMany(validPoems);
    if (newPoems.length == 0) return false;

    const results = { newPoems, inValidPoems };
    return results;
  },

  async update(id: string, poemData: PoemType): Promise<PoemType | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;
    const newPoem = await PoemDB.update(id, poemData)
    if (!newPoem) return false;
    if(await PoemRedis.exists(id) != 0) {
      await PoemRedis.delete(id);
    }
    return newPoem;
  },

  async remove(id: string): Promise<PoemType | false> {
    const poem = await PoemDB.remove(id)
    if (!poem) return false;
    await PoemRedis.delete(id);
    return poem;
  },
};
