import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, ProseType } from '../../interfaces/prose.interface';

describe('GET /proses', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('proses');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const proses: ProseType[] = req.data;

        assert.isArray(proses);
        assert.isDefined(proses[0].poet)
        assert.isDefined(proses[0].qoute)
        assert.isDefined(proses[0].tags)
        assert.isDefined(proses[0].reviewed);
    })
})

describe('GET /proses/random', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('proses/random?num=3');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const proses: ProseType[] = req.data;

        assert.isArray(proses);
        assert.equal(proses.length, 3);


        assert.isDefined(proses[0]._id)
        assert.isString(proses[0].qoute);
    })

    it('gets 400 when query.num is not a number', async () => {
        try {
            await baseHttp.get('proses/random?num=a');
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NUM)    
                return;
            }
            throw error;
        }
    })
})

describe('GET /prose/:id', () => {
    let chosenVerseId: string;
    before(async () => {
        const req = await baseHttp.get('proses');
        chosenVerseId = req.data[0]._id;
    })

    it('Responds with the right JSON body', async() => {
        const req = await baseHttp.get(`prose/${chosenVerseId}`)

        assert.equal(req.status, HttpStatusCode.OK);
        assert.isDefined(req.data._id);
        assert.isDefined(req.data.poet);
        assert.isDefined(req.data.qoute);
        assert.isDefined(req.data.tags);
        assert.isDefined(req.data.reviewed);
    })
    
    it('gets 404 with nonExisting MongoId', async () => {
        try {
            const corruptedId = chosenVerseId.replace(chosenVerseId[5], 'a');
            await baseHttp.get(`prose/${corruptedId}`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }
    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.get(`prose/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })
})
