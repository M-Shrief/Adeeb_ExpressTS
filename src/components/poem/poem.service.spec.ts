import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PoemService } from './poem.service';
// Repository
import { PoemDB, PoemRedis } from './poem.repository';
// Types
import { PoemType } from '../../interfaces/poem.interface';
import { PoetType } from '../../interfaces/poet.interface';

describe.concurrent('Testing PoemService', async () => {
  describe('Testing getAllWithPoetName()', async () => {
    const poems = [
      {
        _id: '6371eb6690c2ad965846c221',
        intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
        poet: {
          _id: '6371ea89885e286801faccaa',
          name: 'التهامي',
        },
        verses: [
          {
            first: 'حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري',
            sec: 'مــا هَــذِهِ الــدُنيا بِـدار قَـرار',
            _id: '6371eb6690c2ad965846c222',
          },
          {
            first: 'بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً',
            sec: 'حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ',
            _id: '6371eb6690c2ad965846c223',
          },
          {
            first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
            sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
            _id: '6371eb6690c2ad965846c224',
          },
        ],
        reviewed: true,
      },
      {
        _id: '6371eb6690c2ad965846c221',
        intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
        poet: {
          _id: '6371ea89885e286801faccaa',
          name: 'التهامي',
        } as PoetType['details'],
        verses: [
          {
            first: 'حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري',
            sec: 'مــا هَــذِهِ الــدُنيا بِـدار قَـرار',
          },
          {
            first: 'بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً',
            sec: 'حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ',
            _id: '6371eb6690c2ad965846c223',
          },
          {
            first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
            sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
            _id: '6371eb6690c2ad965846c224',
          },
        ],
        reviewed: true,
      },
    ] as PoemType[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(PoemDB, 'getAllWithPoetName').mockResolvedValue(poems);
      const result = await PoemService.getAllWithPoetName();
      expect(result).toStrictEqual(poems);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(PoemDB, 'getAllWithPoetName').mockResolvedValue([]);
      const result = await PoemService.getAllWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getAllIntrosWithPoetName()', async () => {
    const poems = [
      {
        _id: '6371eb6690c2ad965846c221',
        intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
        poet: {
          _id: '6371ea89885e286801faccaa',
          name: 'التهامي',
        },
        reviewed: true,
      },
      {
        _id: '6371eb9890c2ad965846c27d',
        intro: 'حَكِّم سُيوفَكَ في رِقابِ العُذَّلِ',
        poet: {
          _id: '6371e9ce885e286801facca2',
          name: 'عنترة بن شداد',
        },
        reviewed: true,
      },
    ] as PoemType[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(PoemDB, 'getAllIntrosWithPoetName').mockResolvedValue(poems);
      const result = await PoemService.getAllIntrosWithPoetName();
      expect(result).toStrictEqual(poems);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(PoemDB, 'getAllIntrosWithPoetName').mockResolvedValue([]);
      const result = await PoemService.getAllIntrosWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getOneWithPoet()', async () => {
    const poem = {
      _id: '6371eb6690c2ad965846c221',
      intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
      poet: {
        _id: '6371ea89885e286801faccaa',
        name: 'التهامي',
        time_period: 'العصر العباسي',
        bio: 'أبو الحسن علي بن محمد بن فهد التهامي. من كبار شعراء العرب، نعته الذهبي بشاعر وقته. مولده ومنشؤه في اليمن، وأصله من أهل مكة، كان يكتم نسبه، فينتسب مرة للعلوية وأخرى لبني أمية. وانتحل مذهب الاعتزال',
      } as PoetType['details'],
      verses: [
        {
          first: 'حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري',
          sec: 'مــا هَــذِهِ الــدُنيا بِـدار قَـرار',
        },
        {
          first: 'بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً',
          sec: 'حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ',
        },
      ],
      reviewed: true,
    } as PoemType;
    test('Gets data successfully from Database', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoemRedis, 'set').mockResolvedValue('');
      vi.spyOn(PoemDB, 'getOneWithPoet').mockResolvedValue(poem);

      const result = await PoemService.getOneWithPoet(
        '6371eb6690c2ad965846c221',
      );
      expect(result).toStrictEqual(poem);
    });
    test('Gets data successfully from Redis', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(JSON.stringify(poem));
      const result = await PoemService.getOneWithPoet(
        '6371eb6690c2ad965846c221',
      );
      expect(result).toStrictEqual(poem);
    });
    it('Returns false if no data is not found', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoemDB, 'getOneWithPoet').mockResolvedValue(null);

      const result = await PoemService.getOneWithPoet(
        '6371eb6690c2ad965846c221',
      );
      expect(result).toEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let intro = 'testing2',
      poet = '6371eb6690c2ad965846c221',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    const poem = { intro, poet, verses } as PoemType;
    test('Post data successfully after validation', async () => {
      vi.spyOn(PoemDB, 'post').mockResolvedValue(poem);

      const result = await PoemService.post(poem);
      expect(result).toStrictEqual(poem);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(PoemDB, 'post').mockResolvedValue(poem);

      const result1 = await PoemService.post({
        intro,
        poet,
      } as PoemType);
      expect(result1).toEqual(false);
      const result2 = await PoemService.post({
        intro,
        verses,
      } as PoemType);
      expect(result2).toEqual(false);
      const result3 = await PoemService.post({
        poet,
        verses,
      } as PoemType);
      expect(result3).toEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let intro = 'testing2',
      poet = '6371eb6690c2ad965846c221',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    const poem1 = { intro, poet, verses } as PoemType;
    const poem2 = { intro, poet, verses } as PoemType;
    const poem3 = { intro, poet, verses } as PoemType;
    const poem4 = { intro, poet } as PoemType;
    const poem5 = { intro, verses } as PoemType;
    const poem6 = { poet, verses } as PoemType;
    test('Post valid data successfully after validation and return inValid ones', async () => {
      vi.spyOn(PoemDB, 'postMany').mockResolvedValue([poem1, poem2, poem3]);

      const result = await PoemService.postMany([
        poem1,
        poem2,
        poem3,
        poem4,
        poem5,
        poem6,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newPoems).toStrictEqual([poem1, poem2, poem3]);
        expect(result.inValidPoems).toStrictEqual([poem4, poem5, poem6]);
      }
    });
  });

  describe('Testing update()', async () => {
    let intro = 'testing2',
      poet = '6371eb6690c2ad965846c221',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    let poem = { intro, poet, verses } as PoemType;
    test('Update poem data successfully after validation', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue(poem);

      const result1 = await PoemService.update('1', { intro } as PoemType);
      expect(result1).toEqual(poem);
      const result2 = await PoemService.update('1', {
        poet,
      } as PoemType);
      expect(result2).toEqual(poem);
      const result3 = await PoemService.update('1', { verses } as PoemType);
      expect(result3).toEqual(poem);
    });
    test('return false after invalid poemData', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue(poem);

      const result1 = await PoemService.update('1', {
        intro: 'sa',
      } as PoemType);
      expect(result1).toEqual(false);
      const result2 = await PoemService.update('1', {
        poet: '214',
      } as PoemType);
      expect(result2).toEqual(false);
      const result3 = await PoemService.update('1', {
        verses: [{ first: 'as', sec: 'a' }],
      } as PoemType);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue(null);

      const result1 = await PoemService.update('1', { intro } as PoemType);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    let intro = 'testing2',
      poet = '6371eb6690c2ad965846c221',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    const poem = { intro, poet, verses } as PoemType;
    test('Successfully deletes poem', async () => {
      vi.spyOn(PoemDB, 'remove').mockResolvedValue(poem);

      const result1 = await PoemService.remove(
        'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      );
      expect(result1).toEqual(poem);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(PoemDB, 'remove').mockResolvedValue(null);

      const result1 = await PoemService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});
