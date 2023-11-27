import { describe, expect, it, vi, test, beforeAll } from 'vitest';
import { responseInfo } from './poet.controller';
import { ERROR_MSG, PoetType } from '../../interfaces/poet.interface';
import HttpStatusCode from '../../utils/httpStatusCode';
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';

describe.concurrent("Testinf PoetTypeController's responseInfo", async () => {
  describe('Testing index()', async () => {
    const service = [
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
    ] as PoetType['details'][];
    test('Success, return poets with status: ok', async () => {
      const { status, poets, errMsg } = responseInfo.index(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poets).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poets, errMsg } = responseInfo.index(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poets).toBeUndefined();
    });
  });

  describe('Testing indexOneWithLiterature()', async () => {
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
    test('Success, return PoetType with status: OK', async () => {
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(poetWithLiterature);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poet).toStrictEqual(poetWithLiterature);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
      expect(poet).toBeUndefined();
    });
  });

  describe('Testing post()', async () => {
    const service = {
        "_id": "639b5cf712eec0bb274cecd4",
        name: 'عنترة بن شداد',
        time_period: 'جاهلي',
    } as PoetType['details'];
    test('Success, saved abd return poet with status: ok', async () => {
      const { status, poet, errMsg } = responseInfo.post(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poet).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poet, errMsg } = responseInfo.post(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poet).toBeUndefined();
    });
  });

  describe('Testing postMany()', async () => {
    const service = {
      newPoets: [
        {
            "_id": "639b5cf712eec0bb274cecd4",
            name: 'عنترة بن شداد',
          time_period: 'جاهلي',
        },
      ] as PoetType['details'][],
      inValidPoets: [
        {
            "_id": "639b5cf712eec0bb274cecd4",
            name: 'عنترة بن شداد',
        },
      ] as PoetType['details'][],
    };
    test('Success, saved abd return poet with status: ok', async () => {
      const { status, poets, errMsg } = responseInfo.postMany(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poets).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poets, errMsg } = responseInfo.postMany(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poets).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    const poet = {
        "_id": "639b5cf712eec0bb274cecd4",
        "name": "محمود شاكر (أبو فهر)",
        "time_period": "القرن العشرين",
        "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
    } as PoetType['details']

    test('Updates poet successfully', async () => {
      const { status, errMsg } = responseInfo.update(poet);
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
    const poet = {
        "_id": "639b5cf712eec0bb274cecd4",
        "name": "محمود شاكر (أبو فهر)",
        "time_period": "القرن العشرين",
        "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
    } as PoetType['details']
    test('Removes poet successfully', async () => {
      const { status, errMsg } = responseInfo.remove(poet);
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
