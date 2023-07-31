import {assert} from 'chai';
import {describe, it} from 'mocha'
import {baseHttp} from '../../utils/axios';
import { PoetType } from '../../interfaces/poet.interface';

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

describe('GET /poets', async () => {
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
})