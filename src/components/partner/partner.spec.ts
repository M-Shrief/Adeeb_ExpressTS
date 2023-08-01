import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp, withAuthHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, PartnerType } from '../../interfaces/partner.interface';


const signupData = {
    "name": "E2E Test",
    "phone": "01235554568",
    "password": "P@ssword1",
};

const loginData = {
    "phone": "01235554567",
    "password": "P@ssword1"
};

describe('POST /partner/login', () => {
    it('It login with correct data', async () => {
        const req = await baseHttp.post('/partner/login', loginData);

        assert.equal(req.status, HttpStatusCode.ACCEPTED);
        
        assert.isTrue(req.data.success);

        assert.containsAllKeys(req.data.partner, ['_id', 'name', 'phone'])

        assert.isString(req.data.accessToken);
    })

    it('Refuse login with incorrect data', async () => {
        try {
            
        const req = await baseHttp.post('/partner/login', {"phone": "01235554227", password: "P@ssword1"});
        } catch (error) {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.NOT_ACCEPTABLE);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_VALID)
                return;
            }
            throw error;
        }
    })

    it('return the correct error message with invalid data', async () => {
        await baseHttp.post('/partner/login', {phone: "01235554227"})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PASSWORD)
                return;
            }
            throw error;
        })      

        await baseHttp.post('/partner/login', { password: "P@ssword1"})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PHONE)
                return;
            }
            throw error;
        })        
 
    })
})

describe('POST /partner/signup', () => {
    it('partner signup successfully with correct data and it return the accessToken', async () => {
        
        const req = await baseHttp.post('partner/signup', signupData);

        assert.equal(req.status, HttpStatusCode.CREATED);

        assert.isTrue(req.data.Success);

        assert.containsAllKeys(req.data.partner, ['_id', 'name', 'phone']);

        assert.isString(req.data.accessToken);

        await withAuthHttp(req.data.accessToken).delete(`partner/${req.data.partner._id}`) 
    });
    
    it('returns the correct error message with invalid data', async () => {
        await baseHttp.post('/partner/signup', {
            // "name": "E2E Test",
            "phone": "01235554467",
            "password": "P@ssword1"
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NAME)
                return;
            }
            throw error;
        });

        await baseHttp.post('/partner/signup', {
            "name": "E2E Test",
            // "phone": "01235554467",
            "password": "P@ssword1"
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PHONE)
                return;
            }
            throw error;
        })

        await baseHttp.post('/partner/signup', {
            "name": "E2E Test",
            "phone": "01235554567"
            // password: ""
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PASSWORD)
                return;
            }
            throw error;
        })
    })
})
