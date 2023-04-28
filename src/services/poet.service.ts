// Models
import Poet from '../models/poet.model';
// Types
import PoetType from '../interfaces/poet.interface';
// Utils
import { logger } from '../utils/logger';
import { Logger } from 'winston';

export default class PoetService {
  private Poet = new Poet();

  public async getPoets(): Promise<PoetType[]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  }

  public async post(peomData: PoetType) {
    const poet = new Poet({
      name: peomData.name,
      time_period: peomData.time_period,
      bio: peomData.bio,
      reviewed: peomData.reviewed,
    });

    try {
      return await poet.save();
    } catch (err) {
      return logger.error(err);
    }
  }

  public async update(id: string, poetData: PoetType) {
    const poet = await Poet.findById(id);

    if (poet) {
      return poet
        .updateOne({ $set: poetData })
        .catch((err) => logger.error(err));
    } else {
      logger.error(`Poet not found`);
    }
  }

  public async remove(id: string) {
    return await Poet.findByIdAndRemove(id);
  }
}
