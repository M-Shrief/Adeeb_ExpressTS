// Repository
import {ProseDB} from './prose.repository'
// Types
import { ProseType } from '../../interfaces/prose.interface';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './prose.schema';

export const ProseService = {
  async getAllWithPoetName(): Promise<ProseType[] | false> {
    const proses = await ProseDB.getAllWithPoetName()
    if (proses.length === 0) return false;
    return proses;
  },

  async getRandomWithPoetName(num: number): Promise<ProseType[] | false> {
    const proses = await ProseDB.getRandomWithPoetName(num)
    if (proses.length === 0) return false;
    return proses;
  },

  async getOneWithPoetName(id: string): Promise<ProseType | false> {
    const prose = await ProseDB.getOneWithPoetName(id)
    if (!prose) return false;
    return prose;
  },

  async post(proseData: ProseType): Promise<ProseType | false> {
    const isValid = await createSchema.isValid(proseData);
    if (!isValid) return false;
    const newProse = await ProseDB.post(proseData);
    if (!newProse) return false;
    return newProse;
  },

  async postMany(
    prosesData: ProseType[],
  ): Promise<{ newProses: ProseType[]; inValidProses: ProseType[] } | false> {
    const isValid = async (proseData: ProseType) =>
      await createSchema.isValid(proseData);
    const isNotValid = async (proseData: ProseType) =>
      (await createSchema.isValid(proseData)) === false;

    const validProses: ProseType[] = await filterAsync(prosesData, isValid);
    const inValidProses: ProseType[] = await filterAsync(
      prosesData,
      isNotValid,
    );

    const newProses = await ProseDB.postMany(validProses);
    if (newProses.length == 0) return false;

    const results = { newProses, inValidProses };
    return results;
  },

  async update(id: string, proseData: ProseType): Promise<ProseType | false> {
    const isValid = await updateSchema.isValid(proseData);
    if (!isValid) return false;
    const newProse = await ProseDB.update(id, proseData);
    if (!newProse) return false;
    return newProse;
  },

  async remove(id: string) {
    const prose = await ProseDB.remove(id);
    if (!prose) return false;
    return prose;
  },
};
