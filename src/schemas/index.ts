import { object, string, array } from 'yup';

export const uuidSchema = string().length(24);

export const introSchema = string().min(4).max(50);

export const versesSchema = array().of(
  object().shape({
    // _id: uuidSchema.optional(),
    first: string().min(4).max(50).required(),
    sec: string().min(4).max(50).required(),
  }),
);

export const qouteSchema = string().min(4).max(300);

export const tagsSchema = string().min(4).max(50);

export const nameSchema = string().min(4).max(50);

export const bioSchema = string().min(4).max(500);

const Time_Period = [
  'جاهلي',
  'أموي',
  'عباسي',
  'أندلسي',
  'عثماني ومملوكي',
  'متأخر وحديث',
  'القرن العشرين',
];
export const timePeriodSchema = string().oneOf(Time_Period);

export const phoneSchema = string().min(4).max(50);
export const addressSchema = string().min(4).max(50);
