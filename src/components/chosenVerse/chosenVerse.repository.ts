// Models
import { ChosenVerse } from './chosenVerse.model';
// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';

export const ChosenVerseDB = {
  async getAllWithPoetName(): Promise<ChosenVerseType[]> {
    return await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verses: 1, poet: 1, poem: 1 },
    ).populate('poet', 'name');
  },

  async getRandomWithPoetName(num: number): Promise<ChosenVerseType[]> {
    return await ChosenVerse.aggregate([
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
  },

  async getOneWithPoetName(id: string): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findById(id, {
      reviewed: 1,
      tags: 1,
      verses: 1,
      poet: 1,
      poem: 1,
    }).populate('poet', 'name');
  },

  async post(chosenVerseData: ChosenVerseType): Promise<ChosenVerseType> {
    const chosenVerse = new ChosenVerse({
      poet: chosenVerseData.poet,
      poem: chosenVerseData.poem,
      tags: chosenVerseData.tags,
      verses: chosenVerseData.verses,
      reviewed: chosenVerseData.reviewed,
    });
    return await chosenVerse.save();
  },

  async postMany(
    chosenVersesData: ChosenVerseType[],
  ): Promise<ChosenVerseType[]> {
    return await ChosenVerse.insertMany(chosenVersesData);
  },

  async update(
    id: string,
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findByIdAndUpdate(id, {
      $set: chosenVerseData,
    });
  },

  async remove(id: string): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findByIdAndRemove(id);
  },
};
