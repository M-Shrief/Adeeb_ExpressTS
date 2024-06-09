// Redis
import redisClient from '../../redis';
// Models
import { Poet } from './poet.model';
// Types
import { PoetType } from '../../interfaces/poet.interface';
import { Logger } from 'winston';
// Utils
import { logger } from '../../utils/logger';
import { Types } from 'mongoose';

export const PoetDB = {
  async getAll(): Promise<PoetType[]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  },

  async getOneWithLiterature(id: string): Promise<PoetType | null> {
    const poet =  await Poet.aggregate<PoetType>([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $unset: [
          "reviewed",
          "createdAt",
          "updatedAt"
        ]
      },
      {
        $lookup: {
          from: "poems",
          localField: "_id",
          foreignField: "poet",
          as: "poems",
          pipeline: [
            {
              $unset: [
                "poet",
                "verses",
                "reviewed",
                "createdAt",
                "updatedAt"
              ]
            },      
          ]
        },
      },
      {
        $lookup: {
          from: "proses",
          localField: "_id",
          foreignField: "poet",
          as: "proses",
          pipeline: [
            {
              $unset: [
                "poet",
                "reviewed",
                "createdAt",
                "updatedAt"
              ]
            },      
          ]        
        },
      },
      {
        $lookup: {
          from: "chosenverses",
          localField: "_id",
          foreignField: "poet",
          as: "chosenVerses",
          pipeline: [
            {
              $unset: [
                "poet",
                "reviewed",
                "createdAt",
                "updatedAt"
              ]
            },      
          ]       
        },
      },
    ])
    if(poet.length == 0) return null
    return poet[0]
  },

  async post(poetData: PoetType): Promise<PoetType> {
    const poet = new Poet({
      name: poetData.name,
      time_period: poetData.time_period,
      bio: poetData.bio,
      reviewed: poetData.reviewed,
    });
    return await poet.save();
  },

  async postMany(
    poetsData: PoetType[],
  ): Promise<PoetType[]> {
    return await Poet.insertMany(poetsData);
  },

  async update(
    _id: string,
    poetData: PoetType,
  ): Promise<PoetType | null> {
    return await Poet.findByIdAndUpdate(_id, { $set: poetData });
  },

  async remove(id: string): Promise<PoetType | null> {
    return await Poet.findByIdAndRemove(id);
  },
};

export const PoetRedis = {
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poet:${id}`);
  },
  async set(id: string, poet: PoetType): Promise<string | Logger | null> {
    return await redisClient
      .set(`poet:${id}`, JSON.stringify(poet), "EX", 60 * 15 )
      .catch((err) => logger.error(`CacheError: couldn't cache poet:${id}`));
  },
  async exists(id: string): Promise<number> {
    return await redisClient.exists(`poet:${id}`)
  },
  async delete(id: string): Promise<number> {
    return await redisClient.del(`poet:${id}`)
  }
};
