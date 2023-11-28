import { describe, expect, vi, test } from 'vitest';
// Service
import { ChosenVerseService } from './chosenVerse.service';
// Repository
import { ChosenVerseDB } from './chosenVerse.repository';
// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
import { PoetType } from '../../interfaces/poet.interface';

describe.concurrent('Tesing ChosenVerseService', async () => {
  describe('Testing getAllWithPoetName()', async () => {
    const chosenVerses = [
      {
        _id: '6371f025ac76f350635f7011',
        poet: {
          _id: '6371ea7a885e286801facca8',
          name: 'أبو تمام',
        },
        poem: '6371ec50df3fa96d1a941c5d',
        reviewed: true,
        tags: 'الشجاعة,الحكمة',
        verses: [
          {
            first: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
            sec: 'في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ',
          },
          {
            first: 'بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في',
            sec: 'مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ',
          },
        ],
      },
      {
        _id: '6371f025ac76f350635f7011',
        poet: {
          _id: '6371ea7a885e286801facca8',
          name: 'أبو تمام',
        },
        poem: '6371ec50df3fa96d1a941c5d',
        reviewed: true,
        tags: 'الشجاعة,الحكمة',
        verses: [
          {
            first: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
            sec: 'في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ',
          },
          {
            first: 'بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في',
            sec: 'مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ',
          },
        ],
      },
    ] as ChosenVerseType[];

    test('Gets data successfully from database', async () => {
      vi.spyOn(ChosenVerseDB, 'getAllWithPoetName').mockResolvedValue(
        chosenVerses,
      );
      const result = await ChosenVerseService.getAllWithPoetName();
      expect(result).toStrictEqual(chosenVerses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ChosenVerseDB, 'getAllWithPoetName').mockResolvedValue([]);
      const result = await ChosenVerseService.getAllWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getRandomWithPoetName()', async () => {
    const chosenVerses = [
      {
        _id: '639c7ebeb95190b2fdf15465',
        verses: [
          {
            first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
            sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
            _id: '639c7ebeb95190b2fdf15466',
          },
          {
            first: 'شكتِ البِثَّ لِنجمٍ ساطعٍ',
            sec: 'ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ',
            _id: '639c7ebeb95190b2fdf15467',
          },
        ],
      },
      {
        _id: '6371f025ac76f350635f7011',
        verses: [
          {
            first: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
            sec: 'في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ',
          },
          {
            first: 'بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في',
            sec: 'مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ',
          },
        ],
      },
    ] as ChosenVerseType[];

    test('Gets data successfully from database', async () => {
      vi.spyOn(ChosenVerseDB, 'getRandomWithPoetName').mockResolvedValue(
        chosenVerses,
      );
      const result = await ChosenVerseService.getRandomWithPoetName(2);
      expect(result).toStrictEqual(chosenVerses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ChosenVerseDB, 'getRandomWithPoetName').mockResolvedValue([]);
      const result = await ChosenVerseService.getRandomWithPoetName(2);
      expect(result).toEqual(false);
    });
  });

  describe('Testing getOneWithPoetName()', async () => {
    const chosenVerse = {
      _id: '639c7ebeb95190b2fdf15465',
      poet: '639b5cf712eec0bb274cecd4',
      poem: '639c7bf9b95190b2fdf1527a',
      tags: 'حزن,نفس',
      reviewed: true,
      verses: [
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
        {
          first: 'شكتِ البِثَّ لِنجمٍ ساطعٍ',
          sec: 'ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ',
        },
      ],
    } as ChosenVerseType;
    test('Gets data successfully from Database', async () => {
      vi.spyOn(ChosenVerseDB, 'getOneWithPoetName').mockResolvedValue(
        chosenVerse,
      );
      const result = await ChosenVerseService.getOneWithPoetName(
        '10fd3a73-13b5-4819-9a32-09136f9476b8',
      );
      expect(result).toStrictEqual(chosenVerse);
    });
    test('Returns false if no data is not found', async () => {
      vi.spyOn(ChosenVerseDB, 'getOneWithPoetName').mockResolvedValue(null);
      const result = await ChosenVerseService.getOneWithPoetName(
        '10fd3a73-13b5-4819-9a32-09136f9476b8',
      );
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = '639b5cf712eec0bb274cecd4',
      poem = '639c7bf9b95190b2fdf1527a';
    let chosenVerse = { tags, verses, poet, poem } as ChosenVerseType;
    test('Post data successfully after validation', async () => {
      vi.spyOn(ChosenVerseDB, 'post').mockResolvedValue(chosenVerse);
      const result = await ChosenVerseService.post(chosenVerse);
      expect(result).toStrictEqual(chosenVerse);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(ChosenVerseDB, 'post').mockResolvedValue(chosenVerse);

      const result1 = await ChosenVerseService.post({
        tags,
        verses,
        poet,
      } as ChosenVerseType);
      expect(result1).toEqual(false);
      const result2 = await ChosenVerseService.post({
        tags,
        verses,
        poem,
      } as ChosenVerseType);
      expect(result2).toEqual(false);
      const result3 = await ChosenVerseService.post({
        tags,
        poet,
        poem,
      } as ChosenVerseType);
      expect(result3).toEqual(false);
      const result4 = await ChosenVerseService.post({
        verses,
        poet,
        poem,
      } as ChosenVerseType);
      expect(result4).toEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = '639b5cf712eec0bb274cecd4',
      poem = '639c7bf9b95190b2fdf1527a';
    let chosenVerse1 = { tags, verses, poet, poem } as ChosenVerseType;
    let chosenVerse2 = { tags, verses, poet, poem } as ChosenVerseType;
    let chosenVerse3 = { tags, verses, poet, poem } as ChosenVerseType;
    let chosenVerse4 = { tags, verses, poet, poem } as ChosenVerseType;
    let chosenVerse5 = { tags, verses, poet } as ChosenVerseType;
    let chosenVerse6 = { tags, verses, poem } as ChosenVerseType;
    let chosenVerse7 = { tags, poet, poem } as ChosenVerseType;
    let chosenVerse8 = { verses, poet, poem } as ChosenVerseType;
    test('Post valid data successfully after validation and return inValid ones', async () => {
      vi.spyOn(ChosenVerseDB, 'postMany').mockResolvedValue([
        chosenVerse1,
        chosenVerse2,
        chosenVerse3,
        chosenVerse4,
      ]);

      const result = await ChosenVerseService.postMany([
        chosenVerse1,
        chosenVerse2,
        chosenVerse3,
        chosenVerse4,
        chosenVerse5,
        chosenVerse6,
        chosenVerse7,
        chosenVerse8,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newChosenVerses).toStrictEqual([
          chosenVerse1,
          chosenVerse2,
          chosenVerse3,
          chosenVerse4,
        ]);
        expect(result.inValidChosenVerses).toStrictEqual([
          chosenVerse5,
          chosenVerse6,
          chosenVerse7,
          chosenVerse8,
        ]);
      }
    });
  });

  describe('Testing update()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = '639b5cf712eec0bb274cecd4',
      poem = '639c7bf9b95190b2fdf1527a',
      chosenVerse = { tags, verses, poet, poem } as ChosenVerseType;

    test('Update chosenVerse data successfully after validation', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue(chosenVerse);

      const result1 = await ChosenVerseService.update(
        '639b5cf712eec0bb274cecd4',
        {
          tags,
        } as ChosenVerseType,
      );
      expect(result1).toEqual(chosenVerse);
      const result2 = await ChosenVerseService.update(
        '639b5cf712eec0bb274cecd4',
        {
          verses,
        } as ChosenVerseType,
      );
      expect(result2).toEqual(chosenVerse);
    });
    test('return false after invalid chosenVerseData', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue(chosenVerse);
      const result1 = await ChosenVerseService.update(
        '639b5cf712eec0bb274cecd4',
        {
          tags: '22',
        } as ChosenVerseType,
      );
      expect(result1).toEqual(false);
      const result2 = await ChosenVerseService.update(
        '639b5cf712eec0bb274cecd4',
        {
          verses: [{ first: 'ss', sec: 'sds' }],
        } as ChosenVerseType,
      );
      expect(result2).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue(null);

      const result1 = await ChosenVerseService.update(
        '639b5cf712eec0bb274cecd4',
        {
          tags,
        } as ChosenVerseType,
      );
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = '639b5cf712eec0bb274cecd4',
      poem = '639c7bf9b95190b2fdf1527a',
      chosenVerse = { tags, verses, poet, poem } as ChosenVerseType;

    test('Successfully deletes poem', async () => {
      vi.spyOn(ChosenVerseDB, 'remove').mockResolvedValue(chosenVerse);

      const result1 = await ChosenVerseService.remove(
        '639b5cf712eec0bb274cecd4',
      );
      expect(result1).toEqual(chosenVerse);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(ChosenVerseDB, 'remove').mockResolvedValue(null);

      const result1 = await ChosenVerseService.remove(
        '639b5cf712eec0bb274cecd4',
      );
      expect(result1).toEqual(false);
    });
  });
});
