import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './chosenVerse.controller';
// Type
import {ChosenVerseType, ERROR_MSG} from '../../interfaces/chosenVerse.interface'
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing ChosenVerseController's responseInfo", async () => {
    describe("Testing indexWithPoetName()", async() => {
        const service = [
          {
            "_id": "6371f025ac76f350635f7011",
            "poet": {
              "_id": "6371ea7a885e286801facca8",
              "name": "أبو تمام"
            },
            "poem": "6371ec50df3fa96d1a941c5d",
            "reviewed": true,
            "tags": "الشجاعة,الحكمة",
            "verses": [
              {
                "first": "السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ",
                "sec": "في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ"
              },
              {
                "first": "بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في",
                "sec": "مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ"
              }
            ]
          },
          {
            "_id": "6371f025ac76f350635f7011",
            "poet": {
              "_id": "6371ea7a885e286801facca8",
              "name": "أبو تمام"
            },
            "poem": "6371ec50df3fa96d1a941c5d",
            "reviewed": true,
            "tags": "الشجاعة,الحكمة",
            "verses": [
              {
                "first": "السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ",
                "sec": "في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ"
              },
              {
                "first": "بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في",
                "sec": "مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ"
              }
            ]
          },
        ] as ChosenVerseType[];
        test('Success, return chosenVerses with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(chosenVerses).toBeUndefined();
        })
    })

    describe("Testing indexRandomWithPoetName()", async() => {
        const service = [
          {
            "_id": "639c7ebeb95190b2fdf15465",
            "verses": [
              {
                "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
                "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
                "_id": "639c7ebeb95190b2fdf15466"
              },
              {
                "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
                "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
                "_id": "639c7ebeb95190b2fdf15467"
              }
            ]
          },
          {
            "_id": "6371f025ac76f350635f7011",
            "verses": [
              {
                "first": "السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ",
                "sec": "في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ"
              },
              {
                "first": "بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في",
                "sec": "مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ"
              }
            ]
          }
        ] as ChosenVerseType[];
        test('Success, return random chosenVerses with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexRandomWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexRandomWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(chosenVerses).toBeUndefined();
        })
    })

    describe("Testing indexOneWithPoetName()", async() => {
        const service = {
          "_id": "639c7ebeb95190b2fdf15465",
          "poet": "639b5cf712eec0bb274cecd4",
          "poem": "639c7bf9b95190b2fdf1527a",
          "tags": "حزن,نفس",
          "reviewed": true,
          "verses": [
            {
              "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
              "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
            },
            {
              "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
              "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
            }
          ]
        } as ChosenVerseType;
        test('Success, return ChosenVerse with status OK', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.indexOneWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerse).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.indexOneWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
            expect(chosenVerse).toBeUndefined();
        });
    })

    describe("Testing post()", async() => {
        const service = {
          "_id": "639c7ebeb95190b2fdf15465",
          "poet": "639b5cf712eec0bb274cecd4",
          "poem": "639c7bf9b95190b2fdf1527a",
          "tags": "حزن,نفس",
          "reviewed": true,
          "verses": [
            {
              "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
              "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
            },
            {
              "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
              "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
            }
          ]
        } as ChosenVerseType;
        test('Success, saved abd return chosenVerse with status: ok', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.post(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(chosenVerse).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.post(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(chosenVerse).toBeUndefined();
        });
    })

    describe("Testing postMany()", async() => {
        const service = {
            newChosenVerses: [
              {
                "_id": "639c7ebeb95190b2fdf15465",
                "poet": "639b5cf712eec0bb274cecd4",
                "poem": "639c7bf9b95190b2fdf1527a",
                "tags": "حزن,نفس",
                "reviewed": true,
                "verses": [
                  {
                    "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
                    "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
                  },
                  {
                    "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
                    "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
                  }
                ]
              },
              {
                "_id": "639c7ebeb95190b2fdf15465",
                "poet": "639b5cf712eec0bb274cecd4",
                "poem": "639c7bf9b95190b2fdf1527a",
                "tags": "حزن,نفس",
                "reviewed": true,
                "verses": [
                  {
                    "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
                    "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
                  },
                  {
                    "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
                    "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
                  }
                ]
              }
            ] as unknown as ChosenVerseType[],
            inValidChosenVerses: [
              {
                "_id": "639c7ebeb95190b2fdf15465",
                "tags": "حزن,نفس",
                "reviewed": true,
                "verses": [
                  {
                    "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
                    "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
                  },
                  {
                    "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
                    "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
                  }
                ]
              },
              {
                "_id": "639c7ebeb95190b2fdf15465",
                "tags": "حزن,نفس",
                "reviewed": true,
                "verses": [
                  {
                    "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
                    "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
                  },
                  {
                    "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
                    "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
                  }
                ]
              }
            ] as unknown as ChosenVerseType[],
        }
        test('Success, saved and return poem with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.postMany(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
      
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.postMany(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(chosenVerses).toBeUndefined();
        });
    })

    describe('Testing update()', async () => {
      const service = {
        "_id": "639c7ebeb95190b2fdf15465",
        "poet": "639b5cf712eec0bb274cecd4",
        "poem": "639c7bf9b95190b2fdf1527a",
        "tags": "حزن,نفس",
        "reviewed": true,
        "verses": [
          {
            "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
            "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
          },
          {
            "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
            "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
          }
        ]
      } as ChosenVerseType;
        test('Updates chosenVerse successfully', async () => {
          const { status, errMsg } = responseInfo.update(service);
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
      const service = {
        "_id": "639c7ebeb95190b2fdf15465",
        "poet": "639b5cf712eec0bb274cecd4",
        "poem": "639c7bf9b95190b2fdf1527a",
        "tags": "حزن,نفس",
        "reviewed": true,
        "verses": [
          {
            "first": "زهرةٌ حَنَّتْ, فباحت؛ فذوت",
            "sec": "أذْبَلَتها نَفْحةٌ لم تُكْتَمِ",
          },
          {
            "first": "شكتِ البِثَّ لِنجمٍ ساطعٍ",
            "sec": "ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ",
          }
        ]
      } as ChosenVerseType;
        test('Removes chosenVerse successfully', async () => {
          const { status, errMsg } = responseInfo.remove(service);
          expect(status).toEqual(HttpStatusCode.ACCEPTED);
          expect(errMsg).toBeUndefined();
        });
        test('Error, Removes is not Acceptable', async () => {
          const { status, errMsg } = responseInfo.remove(false);
          expect(status).toEqual(HttpStatusCode.NOT_FOUND);
          expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
        });
    });
})
