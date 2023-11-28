// Models
import { ChosenVerse } from './chosenVerse.model';
// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
//Schema
import { createSchema, updateSchema } from './chosenVerse.schema';

export const ChosenVerseService = {
  async getAllWithPoetName(): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verses: 1, poet: 1, poem: 1 },
    ).populate('poet', 'name');
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getRandomWithPoetName(num: number): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerse.aggregate([
      { $sample: { size: num } },
      {
        $unset: [
          'updatedAt',
          'createdAt',
          'tags',
          'poet',
          'poem',
          'reviewed',
          '__v',
        ],
      },
    ]);

    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getOneWithPoetName(id: string): Promise<ChosenVerseType | false> {
    const chosenVerse = await ChosenVerse.findById(id, {
      reviewed: 1,
      tags: 1,
      verses: 1,
      poet: 1,
      poem: 1,
    }).populate('poet', 'name');
    if (!chosenVerse) return false;
    return chosenVerse;
  },

  async post(
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const isValid = await createSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const chosenVerse = new ChosenVerse({
      poet: chosenVerseData.poet,
      poem: chosenVerseData.poem,
      tags: chosenVerseData.tags,
      verses: chosenVerseData.verses,
      reviewed: chosenVerseData.reviewed,
    });
    const newChosenVerse = await chosenVerse.save();
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async postMany(
    chosenVersesData: ChosenVerseType[],
  ): Promise<
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

    const newChosenVerses = await ChosenVerse.insertMany(validChosenVerses);
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
    const chosenVerse = await ChosenVerse.findById(id);
    if (!chosenVerse) return false;
    const newChosenVerse = await chosenVerse.updateOne({
      $set: chosenVerseData,
    });
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async remove(id: string): Promise<ChosenVerseType | false> {
    const poet = await ChosenVerse.findByIdAndRemove(id);
    if (!poet) return false;
    return poet;
  },
};
