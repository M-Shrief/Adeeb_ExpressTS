import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, PoemType } from '../../interfaces/poem.interface';

describe('GET /poems', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('poems');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const poems: PoemType[] = req.data;

        assert.isArray(poems);
        assert.isDefined(poems[0].intro)
        assert.isDefined(poems[0].poet)
        assert.isDefined(poems[0].reviewed)
        assert.isArray(poems[0].verses);


    })
})

describe('GET /poem/:id', async () => {
    let poemId: string;
    before(async () => {
        const req = await baseHttp.get('poems');
        poemId = req.data[0]._id;
    })
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get(`poem/${poemId}`);
    
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const poem: PoemType = req.data;
    
        assert.isDefined(poem._id)
        assert.isDefined(poem.intro)
        assert.isDefined(poem.poet)
        assert.isDefined(poem.reviewed)
        assert.isArray(poem.verses);    
    })
    it('gets 404 with nonExisting MongoId', async () => {
        try {
            const corruptedId = poemId.replace(poemId[5], 'a');
            await baseHttp.get(`poem/${corruptedId}`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.NOT_FOUND);
        
                assert.isString(error.response!.data.message)
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.get(`poem/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
        
                assert.isString(error.response!.data.message)
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })
})
