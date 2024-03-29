import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp, withAuthHttp} from './axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, OrderType } from '../../interfaces/order.interface';


const guestOrder = {
    "name":"Guest Order",
    "phone":"01235554580",
    "address":"10th streat",
    "products":[
        {
            "print":{
                "_id":"64c94af001f5418ed965a7dc",
                "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
        },
        {
            "print":{
                "_id":"639b5fabb5e253099333b124",
                "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
            },
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"silver"
        },
        {
            "print":{
                "_id":"639b6109b5e253099333b13c",
                "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
            },
            "fontType":"نسخ",
            "fontColor":"#f6b352",
            "backgroundColor":"#000"
        },
        {
            "print":{
                "poem":"6371eb6690c2ad965846c221",
                "_id":"6371eb6690c2ad965846c224",
                "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#2c3e50"
        }
    ],
    "reviewed": false,
    "completed": false
}

const partnerOrder = {
    "partner":"64c94dc632295fae1b7fb987",
    "name": "The Den Man",
    "phone": "01235554567",
    "address":"10th streat Cairo",
    "products":[
        {
            "prints":[
                {
                    "_id":"64c94af001f5418ed965a7dc",
                    "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                },
                {
                    "_id":"639b5fabb5e253099333b124",
                    "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                },
                {
                    "_id":"639b6109b5e253099333b13c",
                    "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                },
                {
                    "poem":"6371eb6690c2ad965846c221",
                    "_id":"6371eb6690c2ad965846c224",
                    "verses": [
                        {"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}
                    ]
                },
                {
                    "poem":"6371ebccdf3fa96d1a941b8e",
                    "_id":"6371ebccdf3fa96d1a941b91",
                    "verses":[{"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}]
                }
            ],
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
        },
        {
            "prints":[
                {
                    "_id":"639c7ebeb95190b2fdf15465",
                    "verses":[
                        {"first":"زهرةٌ حَنَّتْ, فباحت؛ فذوت","sec":"أذْبَلَتها نَفْحةٌ لم تُكْتَمِ","_id":"639c7ebeb95190b2fdf15466"},
                        {"first":"شكتِ البِثَّ لِنجمٍ ساطعٍ","sec":"ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ","_id":"639c7ebeb95190b2fdf15467"}
                    ]
                },
                {
                    "_id":"6371f4f6ac76f350635f702d",
                    "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                },
                {
                    "_id":"6371f4f6ac76f350635f702c",
                    "verses":[
                        {"first":"نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً","sec":"وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ"},
                        {"first":"ما زادَ فَوق الزادِ خُلِّف ضائِعاً","sec":"في حادِثٍ أَو وارِث أَو عاري"}
                    ]
                },
                {
                    "_id":"6371f4f6ac76f350635f702b",
                    "verses":[{"first":"ثَوب الرِياء يَشِفُّ عَن ما تَحتَهُ","sec":"فَإِذا التحفت بِهِ فَإِنَّكَ عاري"}]
                },
                {
                    "_id":"6371f27eac76f350635f7018",
                    "verses":[
                        {"first":"وَإِذا الجَبانُ نَهاكَ يَومَ كَريهَةٍ","sec":"خَوفاً عَلَيكَ مِنَ اِزدِحامِ الجَحفَلِ"},
                        {"first":"فَاِعصِ مَقالَتَهُ وَلا تَحفِل بِها","sec":"وَاِقدِم إِذا حَقَّ اللِقا في الأَوَّلِ"}
                    ]
                }
            ],
            "fontType":"نسخ",
            "fontColor":"#f6b352",
            "backgroundColor":"#000"
        }
    ],
    "reviewed": false,
    "completed": false
}

describe('get guestOrders POST /orders/guest', () => {
    let orderId: string;
    before(async () => { 
        const req = await baseHttp.post('/order', guestOrder)
        orderId = req.data._id;
    })

    it("gets guests' orders successfully with valid data", async () => {
        const req = await baseHttp.post('/orders/guest', {
            "name":"Guest Order",
            "phone":"01235554580"
        })

        assert.equal(req.status, HttpStatusCode.OK);
        const orders: OrderType[] = req.data;
        assert.isArray(orders);

        assert.isString(orders[0]._id);
        assert.isString(orders[0].name);
        assert.isString(orders[0].phone);
        assert.isString(orders[0].address);
        assert.isBoolean(orders[0].completed);
        assert.isBoolean(orders[0].reviewed);
        assert.isString(orders[0].createdAt);

        assert.isArray(orders[0].products);
        assert.containsAllKeys(orders[0].products[0], guestOrder.products[0]);
    })    

    it("return not found for unknown data", async () => {
        await baseHttp.post('/orders/guest', {
            "name":"Not found Order",
            "phone":"01235522580"
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND);
                return;
            }   
            throw error;
        })
    }) 

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.post('/orders/guest', {
            "phone":"01235522580"
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NAME);
                return;
            }   
            throw error;
        })

        await baseHttp.post('/orders/guest', {
            "name":"Not found Order",
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PHONE);
                return;
            }   
            throw error;
        })
    })

    after(() => {baseHttp.delete(`order/${orderId}`)})
})

describe('get partnersOrders POST /orders/:partner', () => {
    let orderId: string;
    let partnerId: string;
    let token: string;
    before(async () => { 
        const postOrder = await baseHttp.post('/order', partnerOrder)
        orderId = postOrder.data._id;

        const loginReq = await baseHttp.post('/partner/login', {
            "phone": "01235554567",
            "password": "P@ssword1"
        })
        partnerId = loginReq.data.partner._id
        token = loginReq.data.accessToken
    })

    it("gets Partners' orders successfully with valid data", async () => {
        const req = await withAuthHttp(token).get(`/orders/${partnerId}`)

        assert.equal(req.status, HttpStatusCode.OK);
        const orders: OrderType[] = req.data;

        assert.isArray(orders);

        assert.isString(orders[0]._id);
        assert.isString(orders[0].partner);
        assert.isString(orders[0].name);
        assert.isString(orders[0].phone);
        assert.isString(orders[0].address);
        assert.isBoolean(orders[0].completed);
        assert.isBoolean(orders[0].reviewed);
        assert.isString(orders[0].createdAt);

        assert.isArray(orders[0].products);
        assert.containsAllKeys(orders[0].products[0], partnerOrder.products[0]);
    })    

    it("return not available for 0 orders", async () => {
        await withAuthHttp(token).get(`/orders/${partnerId}`)
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_AVAILABLE);
                return;
            }   
            throw error;
        })
    }) 

    it('returns the correct error message with invalid data', async () => {
        await withAuthHttp('124142').get(`/orders/${partnerId}`)
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.UNAUTHORIZED);
                assert.equal(error.response!.data.message, 'Unautorized for this request');
                return;
            }   
            throw error;
        })

        await withAuthHttp(token).get(`/orders/64c9881be1d3e8f030569a6c`)
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_AVAILABLE);
                return;
            }   
            throw error;
        })

        await withAuthHttp(token).get(`/orders/521521`)
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PARTNER);
                return;
            }   
            throw error;
        })
    })

    after(() => {baseHttp.delete(`order/${orderId}`)})
})

describe('POST /order', () => {

    it("Guest orders successfully", async () => {
        const req = await baseHttp.post('/order', guestOrder);

        assert.equal(req.status, HttpStatusCode.CREATED);

        const order: OrderType = req.data
        assert.isString(order._id);
        assert.isString(order.name);
        assert.isString(order.phone);
        assert.isString(order.address);
        assert.isFalse(order.completed);
        assert.isFalse(order.reviewed);
        assert.isArray(order.products);
        assert.containsAllKeys(order.products[0], guestOrder.products[0]);

        await baseHttp.delete(`order/${order._id}`)
    })

    it("Partner orders successfully", async () => {
        const req = await baseHttp.post('/order', partnerOrder);

        assert.equal(req.status, HttpStatusCode.CREATED);

        const order: OrderType = req.data
        assert.isString(order._id);
        assert.isString(order.partner);
        assert.isString(order.name);
        assert.isString(order.phone);
        assert.isString(order.address);
        assert.isFalse(order.completed);
        assert.isFalse(order.reviewed);
        assert.isArray(order.products);
        assert.containsAllKeys(order.products[0], partnerOrder.products[0]);

        await baseHttp.delete(`order/${order._id}`)
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.post(`order`, {
            // "name":"Guest Order",
            "phone":"01235554580",
            "address":"10th streat",
            "products":[
                {
                    "print":{
                        "_id":"64c94af001f5418ed965a7dc",
                        "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "_id":"639b5fabb5e253099333b124",
                        "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                    },
                    "fontType":"نسخ",
                    "fontColor":"#000",
                    "backgroundColor":"silver"
                },
                {
                    "print":{
                        "_id":"639b6109b5e253099333b13c",
                        "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                    },
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "poem":"6371eb6690c2ad965846c221",
                        "_id":"6371eb6690c2ad965846c224",
                        "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#2c3e50"
                }
            ]
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NAME);
                return;
            }   
            throw error;
        })
        
        await baseHttp.post(`order`, {
            "name":"Guest Order",
            // "phone":"01235554580",
            "address":"10th streat",
            "products":[
                {
                    "print":{
                        "_id":"64c94af001f5418ed965a7dc",
                        "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "_id":"639b5fabb5e253099333b124",
                        "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                    },
                    "fontType":"نسخ",
                    "fontColor":"#000",
                    "backgroundColor":"silver"
                },
                {
                    "print":{
                        "_id":"639b6109b5e253099333b13c",
                        "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                    },
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "poem":"6371eb6690c2ad965846c221",
                        "_id":"6371eb6690c2ad965846c224",
                        "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#2c3e50"
                }
            ]
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PHONE);
                return;
            }   
            throw error;
        })   

        await baseHttp.post(`order`, {
            "name":"Guest Order",
            "phone":"01235554580",
            // "address":"10th streat",
            "products":[
                {
                    "print":{
                        "_id":"64c94af001f5418ed965a7dc",
                        "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "_id":"639b5fabb5e253099333b124",
                        "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                    },
                    "fontType":"نسخ",
                    "fontColor":"#000",
                    "backgroundColor":"silver"
                },
                {
                    "print":{
                        "_id":"639b6109b5e253099333b13c",
                        "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                    },
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "poem":"6371eb6690c2ad965846c221",
                        "_id":"6371eb6690c2ad965846c224",
                        "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#2c3e50"
                }
            ]
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.ADDRESS);
                return;
            }   
            throw error;
        })   

        await baseHttp.post(`order`, {
            "name":"Guest Order",
            "phone":"01235554580",
            "address":"10th streat",
            "products":[] // testing here
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PRODUCTS);
                return;
            }   
            throw error;
        })
        
        await baseHttp.post(`order`, {
            "partner": '2414', // testing here
            "name":"Guest Order", 
            "phone":"01235554580",
            "address":"10th streat",
            "products":[
                {
                    "print":{
                        "_id":"64c94af001f5418ed965a7dc",
                        "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "_id":"639b5fabb5e253099333b124",
                        "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                    },
                    "fontType":"نسخ",
                    "fontColor":"#000",
                    "backgroundColor":"silver"
                },
                {
                    "print":{
                        "_id":"639b6109b5e253099333b13c",
                        "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                    },
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "poem":"6371eb6690c2ad965846c221",
                        "_id":"6371eb6690c2ad965846c224",
                        "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#2c3e50"
                }
            ]
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PARTNER);
                return;
            }   
            throw error;
        }) 

        await withAuthHttp('fasfs').post(`order`, { // testing JWT
            "partner": '64b9a77a87178b22560a8e73',
            "name":"Guest Order",
            "phone":"01235554580",
            "address":"10th streat",
            "products":[
                {
                    "print":{
                        "_id":"64c94af001f5418ed965a7dc",
                        "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "_id":"639b5fabb5e253099333b124",
                        "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                    },
                    "fontType":"نسخ",
                    "fontColor":"#000",
                    "backgroundColor":"silver"
                },
                {
                    "print":{
                        "_id":"639b6109b5e253099333b13c",
                        "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                    },
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                },
                {
                    "print":{
                        "poem":"6371eb6690c2ad965846c221",
                        "_id":"6371eb6690c2ad965846c224",
                        "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                    },
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#2c3e50"
                }
            ]
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.UNAUTHORIZED);
                assert.equal(error.response!.data.message, 'Unautorized for this request');
                return;
            }   
            throw error;
        }) 
    })
})

describe('PUT /order/:id', () => {
    let orderId: string;
    before(async () => {
        const req = await baseHttp.post('/order', guestOrder);
        orderId = req.data._id;
    })

    it('updates order data successfully with valid data', async () => {
        const req = await baseHttp.put(`order/${orderId}`, {...partnerOrder});
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.put(`order/${orderId}`, {
            "name":124
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NAME);
                return;
            }   
            throw error;
        })
        
        await baseHttp.put(`order/${orderId}`, {
            "phone": true
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PHONE);
                return;
            }   
            throw error;
        })   

        await baseHttp.put(`order/${orderId}`, {
            "address":true
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.ADDRESS);
                return;
            }   
            throw error;
        })   

        await baseHttp.put(`order/${orderId}`, {
            "products":[] 
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.PRODUCTS);
                return;
            }   
            throw error;
        })
        
        await baseHttp.put(`order/64c94dc632295fae1b7fb200`, {
            "name": 'fasfaffsaasf', // testing here
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.NOT_ACCEPTABLE);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_VALID);
                return;
            }   
            throw error;
        }) 

        await baseHttp.put(`order/1244`, {
            "name": 'fasfaffsaasf', // testing here
        })
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND);
                return;
            }   
            throw error;
        }) 
    })

    after(() => baseHttp.delete(`order/${orderId}`));
})

describe('DELETE /order/:id', () => {
    let orderId: string;
    before(async () => {
        const req = await baseHttp.post('order', guestOrder);
        orderId = req.data._id
    })

    it('Delete order/:id successfully', async () => {
        const req = await baseHttp.delete(`/order/${orderId}`);
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('gets 404 with nonExisting MongoId', async () => {
        try {
            const corruptedId = orderId.replace(orderId[5], 'a');
            await baseHttp.delete(`order/${corruptedId}`)
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
            await baseHttp.delete(`order/22`);
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