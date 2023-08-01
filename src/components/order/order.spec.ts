import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp, withAuthHttp} from '../../utils/axios';
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
    "partner":"64b9a77a87178b22560a8e73",
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

// describe('get guestOrders POST /orders/guest', () => {
    

// })

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