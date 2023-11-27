import { describe, expect, it, vi, test, beforeAll } from 'vitest';
import { responseInfo } from './poem.controller';
import { ERROR_MSG, PoemType } from '../../interfaces/poem.interface';
import HttpStatusCode from '../../utils/httpStatusCode';
import { PoetType } from '../../interfaces/poet.interface';

describe.concurrent("Testing PoemController's responseInfo", async () => {
  describe('Testing indexWithPoetName()', async () => {
    const service = [
      {
        "_id": "6371eb6690c2ad965846c221",
        "intro": "حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري",
        "poet": {
          "_id": "6371ea89885e286801faccaa",
          "name": "التهامي"
        } as PoetType['details'],
        "verses": [
          {
            "first": "حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري",
            "sec": "مــا هَــذِهِ الــدُنيا بِـدار قَـرار",
          },
          {
            "first": "بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً",
            "sec": "حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ",
          },
        ],
        reviewed: false,
      },
      {
        "_id": "6371eb6690c2ad965846c221",
        "intro": "حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري",
        "poet": {
          "_id": "6371ea89885e286801faccaa",
          "name": "التهامي"
        } as PoetType['details'],
        "verses": [
          {
            "first": "حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري",
            "sec": "مــا هَــذِهِ الــدُنيا بِـدار قَـرار",
          },
          {
            "first": "بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً",
            "sec": "حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ",
          },
        ],
        reviewed: false,
      }
    ] as PoemType[];
    test('Success, return poems with status: ok', async () => {
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing indexIntrosWithPoetName()', async () => {
    const service = [
      {
        "_id": "6371eb6690c2ad965846c221",
        "intro": "حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري",
        "poet": {
          "_id": "6371ea89885e286801faccaa",
          "name": "التهامي"
        },
        "reviewed": true
      },
      {
        "_id": "6371eb9890c2ad965846c27d",
        "intro": "حَكِّم سُيوفَكَ في رِقابِ العُذَّلِ",
        "poet": {
          "_id": "6371e9ce885e286801facca2",
          "name": "عنترة بن شداد"
        },
        "reviewed": true
      },
    ] as PoemType[];
    test('Success, return poems with status: ok', async () => {
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing indexOneWithPoet()', async () => {
    const service = {
      "_id": "6371eb6690c2ad965846c221",
      "intro": "حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري",
      "poet": {
        "_id": "6371ea89885e286801faccaa",
        "name": "التهامي",
        "time_period": "العصر العباسي",
        "bio": "أبو الحسن علي بن محمد بن فهد التهامي. من كبار شعراء العرب، نعته الذهبي بشاعر وقته. مولده ومنشؤه في اليمن، وأصله من أهل مكة، كان يكتم نسبه، فينتسب مرة للعلوية وأخرى لبني أمية. وانتحل مذهب الاعتزال"
      } as PoetType['details'],
      "verses": [
        {
          "first": "حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري",
          "sec": "مــا هَــذِهِ الــدُنيا بِـدار قَـرار",
        },
        {
          "first": "بَينـا يَـرى الإِنسـان فيهـا مُخبِـراً",
          "sec": "حَتّــى يُــرى خَبَــراً مِــنَ الأَخبـارِ",
          "_id": "6371eb6690c2ad965846c223"
        }
      ],
      reviewed: true
    } as PoemType;
    test('Success, return Poem with status OK', async () => {
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poem).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
      expect(poem).toBeUndefined();
    });
  });

  describe('Testing post()', async () => {
    const service = {
      "_id": "6371eb6690c2ad965846c221",
      intro: 'testing89',
      verses: [
        {
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
        },
        {
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
        },
      ],
      reviewed: true,
      poet: "6371eb6690c2ad965846c221",
    } as PoemType;
    test('Success, saved and return poem with status: ok', async () => {
      const { status, poem, errMsg } = responseInfo.post(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poem).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poem, errMsg } = responseInfo.post(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poem).toBeUndefined();
    });
  });

  describe('Testing postMany()', async () => {
    const service = {
      newPoems: [
        {
          intro: 'testing89',
          verses: [
            {
              sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
              first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
            },
            {
              sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
              first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
            },
          ],
          reviewed: true,
          poet: "6371eb6690c2ad965846c221",
        },
      ] as PoemType[],
      inValidPoems: [
        {
          intro: 'testing89',
          verses: [
            {
              sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
              first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
            },
            {
              sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
              first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
            },
          ],
        },
      ] as PoemType[],
    };
    test('Success, saved and return poem with status: ok', async () => {
      const { status, poems, errMsg } = responseInfo.postMany(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });

    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poems, errMsg } = responseInfo.postMany(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    test('Updates poem successfully', async () => {
      const { status, errMsg } = responseInfo.update({
        "_id": "6371eb6690c2ad965846c221",
        intro: 'testing89',
        verses: [
          {
            sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
            first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          },
          {
            sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
            first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          },
        ],
        reviewed: true,
        poet: "6371eb6690c2ad965846c221",
      } as PoemType);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Update is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.update(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toEqual(ERROR_MSG.NOT_VALID);
    });
  });

  describe('Testing remove()', async () => {
    test('Remove poem successfully', async () => {
      const { status, errMsg } = responseInfo.remove({
        "_id": "6371eb6690c2ad965846c221",
        intro: 'testing89',
        verses: [
          {
            sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
            first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          },
          {
            sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
            first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          },
        ],
        reviewed: true,
        poet: "6371eb6690c2ad965846c221",
      } as PoemType);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Remove is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.remove(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
    });
  });
});
