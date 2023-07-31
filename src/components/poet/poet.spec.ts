import {assert} from 'chai';
import {describe, it} from 'mocha'
import {baseHttp} from '../../utils/axios';
import { PoetType, ERROR_MSG } from '../../interfaces/poet.interface';
import { AxiosError } from 'axios';

let poetId: string;

describe('GET /poets', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('poets');
        
        assert.strictEqual(req.status, 200);
        const poets: PoetType['details'][] = req.data;

        assert.isArray(poets);
        assert.isDefined(poets[0]._id)
        assert.isDefined(poets[0].name)
        assert.isDefined(poets[0].time_period)


        poetId = poets[0]._id;
    })
})

describe('GET /poet/:id', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get(`poet/${poetId}`);
        
        assert.strictEqual(req.status, 200);
        const poet: PoetType = req.data;

        assert.isDefined(poet.details._id)
        assert.isDefined(poet.details.name)
        assert.isDefined(poet.details.time_period)


        assert.isArray(poet.poems);
        assert.isArray(poet.chosenVerses);
        assert.isArray(poet.proses);
    })

    it('gets 404 with nonExisting MongoId', async () => {
        try {
            const corruptedId = poetId.replace(poetId[5], 'a');
            await baseHttp.get(`poet/${corruptedId}`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, 404);
        
                assert.isString(error.response!.data.message)
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.get(`poet/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, 400);
        
                assert.isString(error.response!.data.message)
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })
})