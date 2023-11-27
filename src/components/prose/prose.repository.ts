// Models
import { Prose } from './prose.model';
// Types
import { ProseType } from '../../interfaces/prose.interface';

export const ProseDB = {
    async getAllWithPoetName(): Promise<ProseType[]> {
      return await Prose.find(
        {},
        { poet: 1, tags: 1, qoute: 1, reviewed: 1 },
      ).populate('poet', 'name');
    },
  
    async getRandomWithPoetName(num: number): Promise<ProseType[]> {
      return await Prose.aggregate([
        { $sample: { size: num } },
        {
          $unset: ['updatedAt', 'createdAt', 'tags', 'poet', 'reviewed', '__v'],
        },
      ]);
    },
  
    async getOneWithPoetName(id: string): Promise<ProseType | null> {
      return await Prose.findById(id, {
        poet: 1,
        tags: 1,
        qoute: 1,
        reviewed: 1,
      }).populate('poet', 'name');
    },
  
    async post(proseData: ProseType): Promise<ProseType> {
      const prose = new Prose({
        poet: proseData.poet,
        tags: proseData.tags,
        qoute: proseData.qoute,
        reviewed: proseData.reviewed,
      });
  
      return await prose.save();
    },
  
    async postMany(
      prosesData: ProseType[],
    ): Promise< ProseType[]> {
      return await Prose.insertMany(prosesData);
    },
  
    async update(id: string, proseData: ProseType): Promise<ProseType | null> {
      return await Prose.findByIdAndUpdate(id, proseData);
    },
  
    async remove(id: string): Promise<ProseType | null> {
      return await Prose.findByIdAndRemove(id);
    },
  };
  