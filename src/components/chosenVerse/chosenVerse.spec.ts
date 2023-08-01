import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, ChosenVerseType } from '../../interfaces/chosenVerse.interface';

describe('GET /chosenverses', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('chosenverses');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const chosenVerses: ChosenVerseType[] = req.data;

        assert.isArray(chosenVerses);
        assert.isDefined(chosenVerses[0]._id)
        assert.isDefined(chosenVerses[0].poet)
        assert.isDefined(chosenVerses[0].poem)
        assert.isArray(chosenVerses[0].verses);
        assert.isDefined(chosenVerses[0].tags)
        assert.isDefined(chosenVerses[0].reviewed)
    })
})

describe('GET /chosenverses/random', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('chosenverses/random?num=3');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const chosenVerses: ChosenVerseType[] = req.data;

        assert.isArray(chosenVerses);
        assert.equal(chosenVerses.length, 3);


        assert.isDefined(chosenVerses[0]._id)
        assert.isArray(chosenVerses[0].verses);
    })

    it('gets 400 when query.num is not a number', async () => {
        try {
            await baseHttp.get('chosenverses/random?num=a');
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

describe('GET /chosenverses/:id', () => {
    let chosenVerseId: string;
    before(async () => {
        const req = await baseHttp.get('chosenverses');
        chosenVerseId = req.data[0]._id;
    })

    it('Responds with the right JSON body', async() => {
        const req = await baseHttp.get(`chosenverse/${chosenVerseId}`)

        assert.equal(req.status, HttpStatusCode.OK);
        assert.isDefined(req.data._id);
        assert.isDefined(req.data.poet);
        assert.isDefined(req.data.poem);
        assert.isArray(req.data.verses);
        assert.isDefined(req.data.tags);
        assert.isDefined(req.data.reviewed);
    })
    
    it('gets 404 with nonExisting MongoId', async () => {
        try {
            const corruptedId = chosenVerseId.replace(chosenVerseId[5], 'a');
            await baseHttp.get(`chosenverse/${corruptedId}`);
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
            await baseHttp.get(`chosenverse/22`);
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
