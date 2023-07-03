// Models
import { Prose } from './prose.model';
// Types
import { ProseType } from '../../interfaces/prose.interface';
// Utils
import { shuffle } from '../../utils/shuffle';
// Schema
import { createSchema, updateSchema } from './prose.schema';
export class ProseService {
  public async getAllWithPoetName(): Promise<ProseType[] | false> {
    const proses = await Prose.find(
      {},
      { poet: 1, tags: 1, qoute: 1, reviewed: 1 },
    ).populate('poet', 'name');
    shuffle(proses);
    if (proses.length === 0) return false;
    return proses;
  }

  public async getRandomWithPoetName(
    num: number,
  ): Promise<ProseType[] | false> {
    const proses = await Prose.aggregate([
      { $sample: { size: num } },
      {
        $unset: ['updatedAt', 'createdAt', 'tags', 'poet', 'reviewed', '__v'],
      },
    ]);
    if (proses.length === 0) return false;
    return proses;
  }

  public async getOneWithPoetName(id: string): Promise<ProseType | false> {
    const prose = await Prose.findById(id, {
      poet: 1,
      tags: 1,
      qoute: 1,
      reviewed: 1,
    }).populate('poet', 'name');

    if (!prose) return false;
    return prose;
  }

  public async post(proseData: ProseType): Promise<ProseType | false> {
    const isValid = await createSchema.isValid(proseData);
    if (!isValid) return false;

    const prose = new Prose({
      poet: proseData.poet,
      tags: proseData.tags,
      qoute: proseData.qoute,
      reviewed: proseData.reviewed,
    });

    const newProse = await prose.save();
    if (!newProse) return false;
    return newProse;
  }

  public async postMany(
    prosesData: ProseType[],
  ): Promise<{newProses: ProseType[], nonValidProses: ProseType[]} | false> {
    let validProses: ProseType[] = [], nonValidProses: ProseType[] = [];

    prosesData.forEach(async (proseData, index) =>  {
      let isValid = await createSchema.isValid(proseData)
      if(isValid && index <= 10) {
        validProses.push(proseData);
      } else {
      nonValidProses.push(proseData);
      }
    });

    const newProses = await Prose.insertMany(validProses, {limit: 10});
    const results = {newProses, nonValidProses}
    if (newProses.length == 0) return false;
    return results;
  }

  public async update(
    id: string,
    proseData: ProseType,
  ): Promise<ProseType | false> {
    const isValid = await updateSchema.isValid(proseData);
    if (!isValid) return false;
    const prose = await Prose.findById(id);
    if (!prose) return false;
    const newProse = await prose.updateOne({ $set: proseData });
    if (!newProse) return false;
    return newProse;
  }

  public async remove(id: string) {
    const prose = await Prose.findByIdAndRemove(id);
    if (!prose) return false;
    return prose;
  }
}
