import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './prose.controller';
// Entity
import { ERROR_MSG, ProseType } from '../../interfaces/prose.interface';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing ProseController's responseInfo", async () => {
    describe("Testing indexWithPoetName()", async() => {
        const service = [
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
          ]  as ProseType[];
        test('Success, return proses with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.indexWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, proses, errMsg } = responseInfo.indexWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(proses).toBeUndefined();
        })
    })

    describe("Testing indexRandomWithPoetName()", async() => {
        const service = [
            {
              "_id": "639b5fabb5e253099333b124",
              "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
            },
            {
              "_id": "639b60c8b5e253099333b138",
              "qoute": "فاقرأ تاريخك بعينٍ عربيّةٍ بصيرةٍ لا تغفل، لا بعينٍ أوروبيّةٍ تخالطها نزعةٌ وطنيّة."
            }
          ] as ProseType[];
        test('Success, return random proses with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.indexRandomWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, proses, errMsg } = responseInfo.indexRandomWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(proses).toBeUndefined();
        })
    })

    describe("Testing indexOneWithPoetName()", async() => {
        const service = {
            "_id": "639b5fabb5e253099333b124",
            "poet": {
              "_id": "639b5cf712eec0bb274cecd4",
              "name": "محمود شاكر (أبو فهر)"
            },
            "tags": "حكمة",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
            "reviewed": true
          } as ProseType;
        test('Success, return Prose with status OK', async () => {
            const { status, prose, errMsg } = responseInfo.indexOneWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(prose).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, prose, errMsg } = responseInfo.indexOneWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
            expect(prose).toBeUndefined();
        });
    })

    describe("Testing post()", async() => {
        const service = {
            "_id": "639b5fabb5e253099333b124",
            "poet": {
              "_id": "639b5cf712eec0bb274cecd4",
              "name": "محمود شاكر (أبو فهر)"
            },
            "tags": "حكمة",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
            "reviewed": true
          } as ProseType;
        test('Success, saved abd return prose with status: ok', async () => {
            const { status, prose, errMsg } = responseInfo.post(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(prose).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, prose, errMsg } = responseInfo.post(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(prose).toBeUndefined();
        });
    })

    describe("Testing postMany()", async() => {
        const service = {
            newProses: [
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
                {
                    "_id": "639b5fabb5e253099333b124",
                    "poet": {
                      "_id": "639b5cf712eec0bb274cecd4",
                      "name": "محمود شاكر (أبو فهر)"
                    },
                    "tags": "حكمة",
                    "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
                    "reviewed": true
                }
            ] as unknown as ProseType[],
            inValidProses: [
                {
                    "_id": "639b5fabb5e253099333b124",
                    "tags": "حكمة",
                    "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
                    "reviewed": true
                },
                {
                    "_id": "639b5fabb5e253099333b124",
                    "poet": {
                      "_id": "639b5cf712eec0bb274cecd4",
                      "name": "محمود شاكر (أبو فهر)"
                    },
                    "reviewed": true
                  }
            ] as unknown as ProseType[],
        }
        test('Success, saved and return poem with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.postMany(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
      
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, proses, errMsg } = responseInfo.postMany(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(proses).toBeUndefined();
        });
    })

    describe('Testing update()', async () => {
        test('Updates prose successfully', async () => {
          const { status, errMsg } = responseInfo.update({
            "_id": "639b5fabb5e253099333b124",
            "poet": {
              "_id": "639b5cf712eec0bb274cecd4",
              "name": "محمود شاكر (أبو فهر)"
            },
            "tags": "حكمة",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
            "reviewed": true
        } as ProseType);
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
        test('Removes prose successfully', async () => {
          const { status, errMsg } = responseInfo.remove({
            "_id": "639b5fabb5e253099333b124",
            "poet": {
              "_id": "639b5cf712eec0bb274cecd4",
              "name": "محمود شاكر (أبو فهر)"
            },
            "tags": "حكمة",
            "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
            "reviewed": true
        } as ProseType);
          expect(status).toEqual(HttpStatusCode.ACCEPTED);
          expect(errMsg).toBeUndefined();
        });
        test('Error, Remove is not Acceptable', async () => {
          const { status, errMsg } = responseInfo.remove(false);
          expect(status).toEqual(HttpStatusCode.NOT_FOUND);
          expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
        });
    });
})
