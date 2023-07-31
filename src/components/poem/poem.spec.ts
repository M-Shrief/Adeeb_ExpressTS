import {assert} from 'chai';
import {describe, it} from 'mocha'
import {baseHttp} from '../../utils/axios';
import { PoemType } from '../../interfaces/poem.interface';

let poemId: string;
describe('GET /poems', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('poems');
        
        assert.strictEqual(req.status, 200);
        const poems: PoemType[] = req.data;

        assert.isArray(poems);
        assert.isDefined(poems[0].intro)
        assert.isDefined(poems[0].poet)
        assert.isDefined(poems[0].reviewed)
        assert.isArray(poems[0].verses);


        poemId = poems[0]._id;
    })
})

describe('GET /poem/:id', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get(`poem/${poemId}`);
    
        assert.strictEqual(req.status, 200);
        const poem: PoemType = req.data;
    
        assert.isDefined(poem._id)
        assert.isDefined(poem.intro)
        assert.isDefined(poem.poet)
        assert.isDefined(poem.reviewed)
        assert.isArray(poem.verses);    
    })
})
