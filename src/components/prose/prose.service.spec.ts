import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { ProseService } from './prose.service';
// Repository
import { ProseDB } from './prose.repository';
// Types
import { ProseType } from '../../interfaces/prose.interface';

describe.concurrent('Testing ProseService', async () => {
  describe("Testing getAllWithPoetName()", async() => {
    const proses = [
      {
        "_id": "639b5f4db5e253099333b120",
        "poet": {
          "_id": "639b5cf712eec0bb274cecd4",
          "name": "محمود شاكر (أبو فهر)"
        },
        "tags": "حكمة",
        "qoute": "واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.",
        "reviewed": true
      },
      {
        "_id": "639b5fabb5e253099333b124",
        "poet": {
          "_id": "639b5cf712eec0bb274cecd4",
          "name": "محمود شاكر (أبو فهر)"
        },
        "tags": "حكمة",
        "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
        "reviewed": true
      },
    ] as ProseType[];
    test("Gets data successfully from database", async() => {
      vi.spyOn(ProseDB, "getAllWithPoetName").mockResolvedValue(proses);
      const result = await ProseService.getAllWithPoetName();
      expect(result).toStrictEqual(proses)    
    })
    test('Returns false if not data is avalaible', async () => {
    vi.spyOn(ProseDB, "getAllWithPoetName").mockResolvedValue([]);
    const result = await ProseService.getAllWithPoetName();
    expect(result).toStrictEqual(false)  
    })
  })

  describe("Testing getRandomWithPoetName()", async() => {
      const proses = [
          {
            "_id": "639b5fabb5e253099333b124",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
          },
          {
            "_id": "639b60c8b5e253099333b138",
            "qoute": "فاقرأ تاريخك بعينٍ عربيّةٍ بصيرةٍ لا تغفل، لا بعينٍ أوروبيّةٍ تخالطها نزعةٌ وطنيّة."
          }
        ]as ProseType[];
      test("Gets data successfully from database", async() => {
          vi.spyOn(ProseDB, "getRandomWithPoetName").mockResolvedValue(proses);
          const result = await ProseService.getRandomWithPoetName(2);
          expect(result).toStrictEqual(proses)    
      })
      test('Returns false if not data is avalaible', async () => {
          vi.spyOn(ProseDB, "getRandomWithPoetName").mockResolvedValue([]);
          const result = await ProseService.getRandomWithPoetName(2);
          expect(result).toStrictEqual(false)  
      })
  })

  describe("Testing getOneWithPoetName()", async() => {
    const prose = {
      "_id": "639b5fabb5e253099333b124",
      "poet": {
        "_id": "639b5cf712eec0bb274cecd4",
        "name": "محمود شاكر (أبو فهر)"
      },
      "tags": "حكمة",
      "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
      "reviewed": true
    } as ProseType;
    test('Gets data successfully from Database', async() => {
      vi.spyOn(ProseDB, "getOneWithPoetName").mockResolvedValue(prose);
      const  result = await ProseService.getOneWithPoetName("8446ff12-da55-458d-b3cf-8226736f5c07");
      expect(result).toStrictEqual(prose);
    })
    test('Returns false if data is not found', async() => {
      vi.spyOn(ProseDB, "getOneWithPoetName").mockResolvedValue(null);
      const  result = await ProseService.getOneWithPoetName("1");
      expect(result).toStrictEqual(false);
    })
  })

  describe("Testing post()", async() => {
    let tags = "حكمة, رثاء",
    qoute = "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
    reviewed= true,
    poet= "639b5fabb5e253099333b124";
    const prose = {tags, qoute, reviewed, poet} as ProseType;
    test("It posts data successfully after validation", async() => {
      vi.spyOn(ProseDB, "post").mockResolvedValue(prose);
      const result = await ProseService.post(prose);
      expect(result).toStrictEqual(prose);
    })
    test("it returns false after inValid validation", async() => {
      vi.spyOn(ProseDB, "post").mockResolvedValue(prose);

      const result1 = await ProseService.post({tags, qoute} as ProseType);
      expect(result1).toStrictEqual(false);
      const result2 = await ProseService.post({tags, poet} as ProseType);
      expect(result2).toStrictEqual(false);
      const result3 = await ProseService.post({ qoute, poet} as ProseType);
      expect(result3).toStrictEqual(false);
    })
  })

  describe("Testing postMany()", async() => {
    let tags = "حكمة, رثاء",
    qoute = "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
    reviewed= true,
    poet= "639b5fabb5e253099333b124";

    const prose1 = {tags, qoute, reviewed, poet} as ProseType;
    const prose2 = {tags, qoute, reviewed, poet} as ProseType;
    const prose3 = {tags, qoute, reviewed, poet} as ProseType;
    const prose4 = {tags, qoute, reviewed} as ProseType;
    const prose5 = {tags, reviewed, poet} as ProseType;
    const prose6 = {qoute, reviewed, poet} as ProseType;
    test("It posts data successfully after validation", async() => {
      vi.spyOn(ProseDB, "postMany").mockResolvedValue([prose1, prose2, prose3]);
      const result = await ProseService.postMany([prose1, prose2, prose3, prose4, prose5, prose6]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newProses).toStrictEqual([prose1, prose2, prose3]);
        expect(result.inValidProses).toStrictEqual([prose4, prose5, prose6]);
      }
    })
  })

    describe('Testing update()', async () => {
      let tags = "حكمة, رثاء",
      qoute = "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
      reviewed= true,
      poet= "639b5fabb5e253099333b124",
      prose = {tags, qoute, reviewed, poet} as ProseType;
    test('Update poem data successfully after validation', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue(prose);

      const result1 = await ProseService.update('1', { tags } as ProseType);
      expect(result1).toEqual(prose);
      const result2 = await ProseService.update('1', {
        poet,
      } as ProseType);
      expect(result2).toEqual(prose);
      const result3 = await ProseService.update('1', { qoute } as ProseType);
      expect(result3).toEqual(prose);
    });
    test('return false after invalid poemData', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue(prose);

      const result1 = await ProseService.update('1', { tags: 'sa' } as ProseType);
      expect(result1).toEqual(false);
      const result2 = await ProseService.update('1', {
        poet: '214',
      } as ProseType);
      expect(result2).toEqual(false);
      const result3 = await ProseService.update('1', {qoute: "sd"} as ProseType);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue(null);

      const result1 = await ProseService.update('1', { qoute } as ProseType);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {

    let tags = "حكمة, رثاء",
    qoute = "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
    reviewed= true,
    poet= "639b5fabb5e253099333b124",
    prose = {tags, qoute, reviewed, poet} as ProseType;
    test('Successfully deletes poem', async () => {
      vi.spyOn(ProseDB, 'remove').mockResolvedValue(prose);

      const result1 = await ProseService.remove('1');
      expect(result1).toEqual(prose);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(ProseDB, 'remove').mockResolvedValue(null);

      const result1 = await ProseService.remove('1');
      expect(result1).toEqual(false);
    });
  });
})