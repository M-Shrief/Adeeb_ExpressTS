import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './partner.controller';
// Type
import { ERROR_MSG, PartnerType } from '../../interfaces/partner.interface';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing PartnerController's responseInfo", async () => {
    describe("Testing indexInfo()", async() => {
        const service = {
            _id: '64b9a77a87178b22560a8e73',
            name: 'The Den Man',
            phone: '01235554567',
          } as unknown as PartnerType;
        test("Success, return partner data successfully with status: OK", async() => {
            const { status, partner, errMsg } = responseInfo.indexInfo(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(partner).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, partner, errMsg } = responseInfo.indexInfo(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
            expect(partner).toBeUndefined();
        });
    })

    describe("Testing signup()", async() => {
        const service = {
            _id: '64b9a77a87178b22560a8e73',
            name: 'The Den Man',
            phone: '01235554567',
          } as unknown as PartnerType;
        test('Success, saved and return partner with status: ok', async () => {
            const { status, partner, errMsg } = responseInfo.signup(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(partner).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
          });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, partner, errMsg } = responseInfo.signup(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(partner).toBeUndefined();
        });
    })

    describe("Testing login()", async() => {
        const service = {
            "phone": "01235554567",
            "password": "P@ssword1"
        } as PartnerType;
        test('Success, saved abd return poem with status: ok', async () => {
            const { status, partner, errMsg } = responseInfo.login(service);
            expect(status).toEqual(HttpStatusCode.ACCEPTED);
            expect(partner).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
          });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, partner, errMsg } = responseInfo.login(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(partner).toBeUndefined();
        });
    })

    describe('Testing update()', async () => {
        const service = {
            _id: '64b9a77a87178b22560a8e73',
            name: 'The Den Man',
            phone: '01235554567',
          } as unknown as PartnerType;
        test('Updates partner successfully', async () => {
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
            _id: '64b9a77a87178b22560a8e73',
            name: 'The Den Man',
            phone: '01235554567',
          } as unknown as PartnerType;
        test('Updates partner successfully', async () => {
          const { status, errMsg } = responseInfo.remove(service);
          expect(status).toEqual(HttpStatusCode.ACCEPTED);
          expect(errMsg).toBeUndefined();
        });
        test('Error, Update is not Acceptable', async () => {
          const { status, errMsg } = responseInfo.remove(false);
          expect(status).toEqual(HttpStatusCode.NOT_FOUND);
          expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
        });
    });
})