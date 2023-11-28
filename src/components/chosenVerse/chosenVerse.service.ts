// Repository
import { ChosenVerseDB } from './chosenVerse.repository';
// Type
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
//Schema
import { createSchema, updateSchema } from './chosenVerse.schema';

export const ChosenVerseService = {
  async getAllWithPoetName(): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerseDB.getAllWithPoetName();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getRandomWithPoetName(num: number): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerseDB.getRandomWithPoetName(num);

    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getOneWithPoetName(id: string): Promise<ChosenVerseType | false> {
    const chosenVerse = await ChosenVerseDB.getOneWithPoetName(id);
    if (!chosenVerse) return false;
    return chosenVerse;
  },

  async post(
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const isValid = await createSchema.isValid(chosenVerseData);
    if (!isValid) return false;
    const newChosenVerse = await ChosenVerseDB.post(chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async postMany(chosenVersesData: ChosenVerseType[]): Promise<
    | {
        newChosenVerses: ChosenVerseType[];
        inValidChosenVerses: ChosenVerseType[];
      }
    | false
  > {
    const isValid = async (chosenVerseData: ChosenVerseType) =>
      await createSchema.isValid(chosenVerseData);
    const isNotValid = async (chosenVerseData: ChosenVerseType) =>
      (await createSchema.isValid(chosenVerseData)) === false;

    const validChosenVerses: ChosenVerseType[] = await filterAsync(
      chosenVersesData,
      isValid,
    );
    const inValidChosenVerses: ChosenVerseType[] = await filterAsync(
      chosenVersesData,
      isNotValid,
    );

    const newChosenVerses = await ChosenVerseDB.postMany(validChosenVerses);
    if (newChosenVerses.length == 0) return false;

    const results = { newChosenVerses, inValidChosenVerses };
    return results;
  },

  async update(
    id: string,
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const isValid = await updateSchema.isValid(chosenVerseData);
    if (!isValid) return false;
    const newChosenVerse = await ChosenVerseDB.update(id, chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async remove(id: string): Promise<ChosenVerseType | false> {
    const poet = await ChosenVerseDB.remove(id);
    if (!poet) return false;
    return poet;
  },
};
