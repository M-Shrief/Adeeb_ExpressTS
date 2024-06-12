import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PoetService } from './poet.service';
// Repository
import { PoetDB, PoetRedis } from './poet.repository';
// Type
import {PoetType} from '../../interfaces/poet.interface';
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';

describe.concurrent('Testing PoetSerivce', async () => {
  describe('Testing getALL()', async () => {
    const poets = [     
        {
            "_id": "6371e9ce885e286801facca2",
            "name": "عنترة بن شداد",
            "time_period": "العصر الجاهلي"
        },
        {
            "_id": "6371ea57885e286801facca4",
            "name": "عمرو بن كلثوم",
            "time_period": "العصر الجاهلي"
        },
        {
            "_id": "6371ea6d885e286801facca6",
            "name": "امرؤ القيس",
            "time_period": "العصر الجاهلي"
        },
    ] as PoetType[];
    test('Gets data successfully from Database', async () => {
      vi.spyOn(PoetDB, 'getAll').mockResolvedValue(poets);

      const result = await PoetService.getAll();
      expect(result).toStrictEqual(poets);
    });
    test('Returns false if no data is available', async () => {
      vi.spyOn(PoetDB, 'getAll').mockResolvedValue([]);

      const result = await PoetService.getAll();
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing getOneWithLiterature()', async () => {
    const poetWithLiterature = {
        "details": {
          "_id": "639b5cf712eec0bb274cecd4",
          "name": "محمود شاكر (أبو فهر)",
          "time_period": "القرن العشرين",
          "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
        },
        "poems": [
          {
            "_id": "639c7bf9b95190b2fdf1527a",
            "intro": "حسرةٌ ولَّت, و أخرى أقبلت",
            "reviewed": true
          }
        ],
        "proses": [
          {
            "_id": "639b5fabb5e253099333b124",
            "tags": "حكمة",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
          },
        ],
        "chosenVerses": [
            {
              "_id": "639c7d54b95190b2fdf15457",
              "poem": "639c7bf9b95190b2fdf1527a",
              "tags": "رثاء,حزن,نفس",
              "reviewed": true,
              "verses": [
                {
                  "first": "حسرةٌ ولَّت, و أخرى أقبلت",
                  "sec": "كيفَ؟ مِن أينَ؟ .. متى؟ لم أعلمِ",
                  "_id": "639c7d54b95190b2fdf15458"
                },
                {
                  "first": "موجةٌ سوداءُ تنقضُّ على",
                  "sec": "موجةٍ في بحر ليلٍ مظلمِ",
                  "_id": "639c7d54b95190b2fdf15459"
                }
              ]
            },
        ] as unknown as ChosenVerseType[]
    } as PoetType;      
    it('Gets data successfully from Database', async () => {
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoetRedis, 'set').mockResolvedValue('');
      vi.spyOn(PoetDB, 'getOneWithLiterature').mockResolvedValue(
        poetWithLiterature,
      );

      const result = await PoetService.getOneWithLiterature(
        '639c7bf9b95190b2fdf1527a',
      );
      expect(result).toStrictEqual(poetWithLiterature);
    });

    it('Gets data successfully from Redis', async () => {
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(
        JSON.stringify(poetWithLiterature),
      );

      const result = await PoetService.getOneWithLiterature(
        '639c7bf9b95190b2fdf1527a',
      );
      expect(result).toStrictEqual(poetWithLiterature);
    });

    it('Returns false if no data is not found', async () => {
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoetDB, 'getOneWithLiterature').mockResolvedValue(null);

      const result = await PoetService.getOneWithLiterature(
        '639c7bf9b95190b2fdf1527a',
      );
      expect(result).toEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let name = 'عنترة بن شداد',
      time_period = 'جاهلي',
      bio =
        'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.';

    const poet = { name, time_period, bio } as PoetType;
    test('Post data successfully after validation', async () => {
      vi.spyOn(PoetDB, 'post').mockResolvedValue(poet);

      const result = await PoetService.post(poet);
      expect(result).toStrictEqual(poet);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(PoetDB, 'post').mockResolvedValue(poet);

      const result1 = await PoetService.post({ name, time_period } as PoetType);
      expect(result1).toEqual(false);
      const result2 = await PoetService.post({ name, bio } as PoetType);
      expect(result2).toEqual(false);
      const result3 = await PoetService.post({ time_period, bio } as PoetType);
      expect(result3).toEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let name = 'عنترة بن شداد',
      time_period = 'جاهلي',
      bio =
        'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.';

    const poet1 = { name, time_period, bio } as PoetType;
    const poet2 = { name, time_period, bio } as PoetType;
    const poet3 = { name, time_period, bio } as PoetType;
    const poet4 = { name, time_period } as PoetType;
    const poet5 = { name, bio } as PoetType;
    const poet6 = { time_period, bio } as PoetType;
    test('Post valid data successfully after validation and return inValid ones', async () => {
      vi.spyOn(PoetDB, 'postMany').mockResolvedValue([poet1, poet2, poet3]);

      const result = await PoetService.postMany([
        poet1,
        poet2,
        poet3,
        poet4,
        poet5,
        poet6,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newPoets).toStrictEqual([poet1, poet2, poet3]);
        expect(result.inValidPoets).toStrictEqual([poet4, poet5, poet6]);
      }
    });
  });

  describe('Testing update()', async () => {
    let name = 'عنترة بن شداد',
      time_period = 'جاهلي',
      bio =
        'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.';
    const poet = {name, time_period, bio} as PoetType;
    test('Update poet data successfully after successful validation', async () => {
      vi.spyOn(PoetDB, 'update').mockResolvedValue(poet);
      vi.spyOn(PoetRedis, 'exists').mockResolvedValue(1);
      vi.spyOn(PoetRedis, 'delete').mockResolvedValue(1);
      
      const result1 = await PoetService.update('1', { name } as PoetType);
      expect(result1).toEqual(poet);
      const result2 = await PoetService.update('1', { time_period } as PoetType);
      expect(result2).toEqual(poet);
      const result3 = await PoetService.update('1', { bio } as PoetType);
      expect(result3).toEqual(poet);
    });
    test('return false after invalid poetData', async () => {
      vi.spyOn(PoetDB, 'update').mockResolvedValue({name, time_period, bio} as PoetType);

      const result1 = await PoetService.update('1', { name: 'sa' } as PoetType);
      expect(result1).toEqual(false);
      const result2 = await PoetService.update('1', {time_period: 'عثماني ' } as PoetType);
      expect(result2).toEqual(false);
      const result3 = await PoetService.update('1', { bio: 'sds' } as PoetType);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(PoetDB, 'update').mockResolvedValue(null);

      const result1 = await PoetService.update('1', { name } as PoetType);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    const poet = {
        "_id": "639b5cf712eec0bb274cecd4",
        "name": "محمود شاكر (أبو فهر)",
        "time_period": "القرن العشرين",
        "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
    } as PoetType
    test('Successfully deletes poet', async () => {
      vi.spyOn(PoetDB, 'remove').mockResolvedValue(poet);
      vi.spyOn(PoetRedis, 'delete').mockResolvedValue(1);

      const result1 = await PoetService.remove('1');
      expect(result1).toEqual(poet);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(PoetDB, 'remove').mockResolvedValue(null);

      const result1 = await PoetService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});
