import {assert} from 'chai';
import {describe, it} from 'mocha'
import { AxiosError } from 'axios';
// Utils
import {baseHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { PoetType, ERROR_MSG } from '../../interfaces/poet.interface';

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

describe('POST /poets', () => {
    const data = [
        {
            "name": "التهامي",
            "time_period": "عباسي",
            "bio": "أبو الحسن علي بن محمد بن فهد التهامي. من كبار شعراء العرب، نعته الذهبي بشاعر وقته. مولده ومنشؤه في اليمن، وأصله من أهل مكة، كان يكتم نسبه، فينتسب مرة للعلوية وأخرى لبني أمية. وانتحل مذهب الاعتزال",
            "reviewed": true,
        },
        {
            "name": "محمود شاكر (أبو فهر)",
            "time_period": "متأخر وحديث",
            "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
            "reviewed": true,
        },
        {
            "name": 21,
            "time_period": 421,
            "bio": "رزق عقل الشافعي، وعبقرية الخليل، ولسان ابن حزم، وشجاعة ابن تيمية، وبهذه الأمور الأربعة مجتمعة حصَّل من المعارف والعلوم العربية ما لم يحصله أحد من أبناء جيله، ثم خاض تلك المعارك الحامية: فحارب الدعوة إلى العامية، وحارب الدعوة إلى كتابة اللغة العربية بالحروف اللاتينية، وحارب الدعوة إلى هلهلة اللغة العربية، والعبث بها بحجة التطور اللغوي، ثم حارب من قبل ومن بعد: الخرافات والبدع والشعوذة التي ابتعدت بالمسلمين عن منهج السلف، في صحة العقيدة، وفي تجريد الإيمان من شوائب الشرك الظاهر والباطن",
            "reviewed": true,
        }

    ];
    const testPoetsId: string[] = [];
    afterEach(() => {
        testPoetsId.forEach(async (id) => {
            await baseHttp.delete(`poet/${id}`);
        })
    })
    it('it saves valid entries correctly, and returns valid & non-valid entries', async () => {
        const req = await baseHttp.post('/poets', data);
        const poetsIds = req.data.newPoets.map((poet: PoetType['details']) => poet._id)
        testPoetsId.push(...poetsIds);

        assert.strictEqual(req.status, HttpStatusCode.CREATED)

        assert.isNotEmpty(req.data.newPoets);
        assert.containsAllKeys(req.data.newPoets[0], data[0]);

        assert.isNotEmpty(req.data.nonValidPoets);
        assert.containsAllKeys(req.data.nonValidPoets[0], data[2]);
    })
})