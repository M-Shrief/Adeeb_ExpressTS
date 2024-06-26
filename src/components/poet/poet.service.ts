// Repository
import {PoetDB, PoetRedis} from './poet.repository'
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Schema
import { createSchema, updateSchema } from './poet.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';

export const PoetService = {
  async getAll(): Promise<PoetType[] | false> {
    const poets = await PoetDB.getAll()
    if (poets.length === 0) return false;
    return poets;
  },

  async getOneWithLiterature(id: string): Promise<PoetType | false> {
    let poet: PoetType | null;
    const cached = await PoetRedis.get(id);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoetDB.getOneWithLiterature(id);
    }
    if (!poet) return false;
    await PoetRedis.set(id, poet)
    return poet;
  },

  async post(
    poetData: PoetType,
  ): Promise<PoetType | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;
    const newPoet = await PoetDB.post(poetData);
    if (!newPoet) return false;
    return newPoet;
  },

  async postMany(
    poetsData: PoetType[],
  ): Promise<
    | { newPoets: PoetType[]; inValidPoets: PoetType[] }
    | false
  > {
    const isValid = async (poetData: PoetType) =>
      await createSchema.isValid(poetData);
    const isNotValid = async (poetData: PoetType) =>
      (await createSchema.isValid(poetData)) === false;

    const validPoets: PoetType[] = await filterAsync(
      poetsData,
      isValid,
    );
    const inValidPoets: PoetType[] = await filterAsync(
      poetsData,
      isNotValid,
    );

    const newPoets = await PoetDB.postMany(validPoets);
    if (newPoets.length == 0) return false;

    const results = { newPoets, inValidPoets };
    return results;
  },

  async update(
    id: string,
    poetData: PoetType,
  ): Promise<PoetType | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;
    const newPoet = await PoetDB.update(id, poetData)
    if (!newPoet) return false;
    if(await PoetRedis.exists(id) != 0) {
      await PoetRedis.delete(id);
    }
    return newPoet;
  },

  async remove(id: string): Promise<PoetType | false> {
    const poet = await PoetDB.remove(id);
    if (!poet) return false;
    await PoetRedis.delete(id);
    return poet;
  },
};
