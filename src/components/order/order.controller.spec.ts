import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './order.controller';
// Entity
import { ERROR_MSG, OrderType } from '../../interfaces/order.interface';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing OrderController's responseInfo", async () => {
  describe('Testing indexGuestOrders & indexPartnerOrders responseInfo', async () => {
    const service1 = [
      {
        reviewed: false,
        completed: false,
        _id: '64ff0fb2e4cdbcc06848e89a',
        products: [
          {
            prints: [
              {
                _id: '6371f27eac76f350635f701f',
                verses: [
                  {
                    first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                    sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
                  },
                ],
              },
              {
                _id: '6371f025ac76f350635f7012',
                verses: [
                  {
                    first: 'لَو لَم يَقُد جَحفَلاً يَومَ الوَغى لَغَدا',
                    sec: 'مِن نَفسِهِ وَحدَها في جَحفَلٍ لَجِبِ',
                  },
                ],
              },
              {
                _id: '6371f4f6ac76f350635f7029',
                verses: [
                  {
                    first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                    sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
                  },
                  {
                    first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                    sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
                  },
                ],
              },
              {
                _id: '6371f4f6ac76f350635f7025',
                verses: [
                  {
                    first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                    sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                  },
                  {
                    first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                    sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
                  },
                ],
              },
              {
                _id: '639c7fc7b95190b2fdf15470',
                verses: [
                  {
                    first: 'وَ حَيَاةٌ مِنْ فَنَاءٍ فُجِّرَتْ',
                    sec: 'لِفَنَاءٍ في حَيَاةٍ يَرْتَمي',
                    _id: '639c7fc7b95190b2fdf15471',
                  },
                  {
                    first: 'كُلُّهُ لَمْحُ وَمِيضٍ خَاطِفٍ',
                    sec: 'ثُمَّ .. لا شَيء .. فَجَاهِدْ أو نَمِ',
                    _id: '639c7fc7b95190b2fdf15472',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            prints: [
              {
                _id: '639b5f4db5e253099333b120',
                qoute:
                  'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
              },
              {
                _id: '639b6201b5e253099333b148',
                qoute:
                  'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
              },
              {
                _id: '639b6072b5e253099333b132',
                qoute:
                  'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
              },
              {
                _id: '639b6109b5e253099333b13c',
                qoute:
                  'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
              },
              {
                _id: '639b6180b5e253099333b142',
                qoute:
                  'وإنّ امرأ يقتل لغته وبيانها وآخر يقتل نفسه لمثلان، والثاني أعقل الرجلين.',
              },
            ],
            fontType: 'نسخ',
            fontColor: '#000',
            backgroundColor: 'silver',
          },
        ],
        name: 'The Den Man',
        phone: '01235554567',
        address: '10Removed Adress',
        createdAt: '2023-09-11T13:01:38.002Z',
      },
    ] as OrderType[];
    const service2 = [
      {
        reviewed: false,
        completed: false,
        _id: '64ff0fb2e4cdbcc06848e89a',
        products: [
          {
            prints: [
              {
                _id: '6371f27eac76f350635f701f',
                verses: [
                  {
                    first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                    sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
                  },
                ],
              },
              {
                _id: '6371f025ac76f350635f7012',
                verses: [
                  {
                    first: 'لَو لَم يَقُد جَحفَلاً يَومَ الوَغى لَغَدا',
                    sec: 'مِن نَفسِهِ وَحدَها في جَحفَلٍ لَجِبِ',
                  },
                ],
              },
              {
                _id: '6371f4f6ac76f350635f7029',
                verses: [
                  {
                    first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                    sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
                  },
                  {
                    first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                    sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
                  },
                ],
              },
              {
                _id: '6371f4f6ac76f350635f7025',
                verses: [
                  {
                    first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                    sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                  },
                  {
                    first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                    sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
                  },
                ],
              },
              {
                _id: '639c7fc7b95190b2fdf15470',
                verses: [
                  {
                    first: 'وَ حَيَاةٌ مِنْ فَنَاءٍ فُجِّرَتْ',
                    sec: 'لِفَنَاءٍ في حَيَاةٍ يَرْتَمي',
                    _id: '639c7fc7b95190b2fdf15471',
                  },
                  {
                    first: 'كُلُّهُ لَمْحُ وَمِيضٍ خَاطِفٍ',
                    sec: 'ثُمَّ .. لا شَيء .. فَجَاهِدْ أو نَمِ',
                    _id: '639c7fc7b95190b2fdf15472',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            prints: [
              {
                _id: '639b5f4db5e253099333b120',
                qoute:
                  'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
              },
              {
                _id: '639b6201b5e253099333b148',
                qoute:
                  'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
              },
              {
                _id: '639b6072b5e253099333b132',
                qoute:
                  'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
              },
              {
                _id: '639b6109b5e253099333b13c',
                qoute:
                  'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
              },
              {
                _id: '639b6180b5e253099333b142',
                qoute:
                  'وإنّ امرأ يقتل لغته وبيانها وآخر يقتل نفسه لمثلان، والثاني أعقل الرجلين.',
              },
            ],
            fontType: 'نسخ',
            fontColor: '#000',
            backgroundColor: 'silver',
          },
        ],
        name: 'The Den Man',
        phone: '01235554567',
        address: '10Removed Adress',
        createdAt: '2023-09-11T13:01:38.002Z',
      },
    ] as OrderType[];
    test('Success, return guestOrders with status: ok', async () => {
      const result1 = responseInfo.indexOrders(service1);
      expect(result1.status).toEqual(HttpStatusCode.OK);
      expect(result1.orders).toStrictEqual(service1);
      expect(result1.errMsg).toBeUndefined();

      const result2 = responseInfo.indexOrders(service2);
      expect(result2.status).toEqual(HttpStatusCode.OK);
      expect(result2.orders).toStrictEqual(service2);
      expect(result2.errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const result1 = responseInfo.indexOrders(false);
      expect(result1.status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(result1.errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
      expect(result1.orders).toBeUndefined();
    });
  });

  describe('Testing postGuest & postPartner responseInfo', async () => {
    let partner = '64ff0fb2e4cdbcc06848e89a',
      name = 'The Den Man',
      phone = '01235554567',
      address = '10th streat Cairo',
      products = [
        {
          prints: [
            {
              _id: '6371f27eac76f350635f701f',
              verses: [
                {
                  first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                  sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
                },
              ],
            },
            {
              _id: '6371f025ac76f350635f7012',
              verses: [
                {
                  first: 'لَو لَم يَقُد جَحفَلاً يَومَ الوَغى لَغَدا',
                  sec: 'مِن نَفسِهِ وَحدَها في جَحفَلٍ لَجِبِ',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7029',
              verses: [
                {
                  first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                  sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
                },
                {
                  first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                  sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7025',
              verses: [
                {
                  first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                  sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                },
                {
                  first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                  sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
                },
              ],
            },
            {
              _id: '639c7fc7b95190b2fdf15470',
              verses: [
                {
                  first: 'وَ حَيَاةٌ مِنْ فَنَاءٍ فُجِّرَتْ',
                  sec: 'لِفَنَاءٍ في حَيَاةٍ يَرْتَمي',
                  _id: '639c7fc7b95190b2fdf15471',
                },
                {
                  first: 'كُلُّهُ لَمْحُ وَمِيضٍ خَاطِفٍ',
                  sec: 'ثُمَّ .. لا شَيء .. فَجَاهِدْ أو نَمِ',
                  _id: '639c7fc7b95190b2fdf15472',
                },
              ],
            },
          ],
          fontType: 'نسخ',
          fontColor: '#fff',
          backgroundColor: '#000',
        },
        {
          prints: [
            {
              _id: '639b5f4db5e253099333b120',
              qoute:
                'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
            },
            {
              _id: '639b6201b5e253099333b148',
              qoute:
                'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
            },
            {
              _id: '639b6072b5e253099333b132',
              qoute:
                'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
            },
            {
              _id: '639b6109b5e253099333b13c',
              qoute:
                'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
            },
            {
              _id: '639b6180b5e253099333b142',
              qoute:
                'وإنّ امرأ يقتل لغته وبيانها وآخر يقتل نفسه لمثلان، والثاني أعقل الرجلين.',
            },
          ],
          fontType: 'نسخ',
          fontColor: '#000',
          backgroundColor: 'silver',
        },
      ],
      guestOrder = { name, phone, address, products } as OrderType,
      partnerOrder = { partner, name, phone, address, products } as OrderType;

    test('Success, saved and return Order with status: CREATED', async () => {
      const result1 = responseInfo.postOrder(guestOrder);
      expect(result1.status).toEqual(HttpStatusCode.CREATED);
      expect(result1.order).toStrictEqual(guestOrder);
      expect(result1.errMsg).toBeUndefined();

      const result2 = responseInfo.postOrder(partnerOrder);
      expect(result2.status).toEqual(HttpStatusCode.CREATED);
      expect(result2.order).toStrictEqual(partnerOrder);
      expect(result2.errMsg).toBeUndefined();
    });

    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, order, errMsg } = responseInfo.postOrder(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(order).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    let name = 'The Den Man',
      phone = '01235554567',
      address = '10th streat Cairo',
      products = [
        {
          prints: [
            {
              _id: '6371f27eac76f350635f701f',
              verses: [
                {
                  first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                  sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
                },
              ],
            },
            {
              _id: '6371f025ac76f350635f7012',
              verses: [
                {
                  first: 'لَو لَم يَقُد جَحفَلاً يَومَ الوَغى لَغَدا',
                  sec: 'مِن نَفسِهِ وَحدَها في جَحفَلٍ لَجِبِ',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7029',
              verses: [
                {
                  first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                  sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
                },
                {
                  first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                  sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7025',
              verses: [
                {
                  first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                  sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                },
                {
                  first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                  sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
                },
              ],
            },
            {
              _id: '639c7fc7b95190b2fdf15470',
              verses: [
                {
                  first: 'وَ حَيَاةٌ مِنْ فَنَاءٍ فُجِّرَتْ',
                  sec: 'لِفَنَاءٍ في حَيَاةٍ يَرْتَمي',
                  _id: '639c7fc7b95190b2fdf15471',
                },
                {
                  first: 'كُلُّهُ لَمْحُ وَمِيضٍ خَاطِفٍ',
                  sec: 'ثُمَّ .. لا شَيء .. فَجَاهِدْ أو نَمِ',
                  _id: '639c7fc7b95190b2fdf15472',
                },
              ],
            },
          ],
          fontType: 'نسخ',
          fontColor: '#fff',
          backgroundColor: '#000',
        },
        {
          prints: [
            {
              _id: '639b5f4db5e253099333b120',
              qoute:
                'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
            },
            {
              _id: '639b6201b5e253099333b148',
              qoute:
                'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
            },
            {
              _id: '639b6072b5e253099333b132',
              qoute:
                'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
            },
            {
              _id: '639b6109b5e253099333b13c',
              qoute:
                'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
            },
            {
              _id: '639b6180b5e253099333b142',
              qoute:
                'وإنّ امرأ يقتل لغته وبيانها وآخر يقتل نفسه لمثلان، والثاني أعقل الرجلين.',
            },
          ],
          fontType: 'نسخ',
          fontColor: '#000',
          backgroundColor: 'silver',
        },
      ],
      order = { name, phone, address, products } as OrderType;
    test('Updates Order successfully', async () => {
      const { status, errMsg } = responseInfo.update(order);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Update is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.update(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toEqual(ERROR_MSG.NOT_VALID);
    });
  });

  describe('Testing remove()', async () => {
    let name = 'The Den Man',
      phone = '01235554567',
      address = '10th streat Cairo',
      products = [
        {
          prints: [
            {
              _id: '6371f27eac76f350635f701f',
              verses: [
                {
                  first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                  sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
                },
              ],
            },
            {
              _id: '6371f025ac76f350635f7012',
              verses: [
                {
                  first: 'لَو لَم يَقُد جَحفَلاً يَومَ الوَغى لَغَدا',
                  sec: 'مِن نَفسِهِ وَحدَها في جَحفَلٍ لَجِبِ',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7029',
              verses: [
                {
                  first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                  sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
                },
                {
                  first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                  sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
                },
              ],
            },
            {
              _id: '6371f4f6ac76f350635f7025',
              verses: [
                {
                  first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                  sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                },
                {
                  first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                  sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
                },
              ],
            },
            {
              _id: '639c7fc7b95190b2fdf15470',
              verses: [
                {
                  first: 'وَ حَيَاةٌ مِنْ فَنَاءٍ فُجِّرَتْ',
                  sec: 'لِفَنَاءٍ في حَيَاةٍ يَرْتَمي',
                  _id: '639c7fc7b95190b2fdf15471',
                },
                {
                  first: 'كُلُّهُ لَمْحُ وَمِيضٍ خَاطِفٍ',
                  sec: 'ثُمَّ .. لا شَيء .. فَجَاهِدْ أو نَمِ',
                  _id: '639c7fc7b95190b2fdf15472',
                },
              ],
            },
          ],
          fontType: 'نسخ',
          fontColor: '#fff',
          backgroundColor: '#000',
        },
        {
          prints: [
            {
              _id: '639b5f4db5e253099333b120',
              qoute:
                'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
            },
            {
              _id: '639b6201b5e253099333b148',
              qoute:
                'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
            },
            {
              _id: '639b6072b5e253099333b132',
              qoute:
                'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
            },
            {
              _id: '639b6109b5e253099333b13c',
              qoute:
                'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
            },
            {
              _id: '639b6180b5e253099333b142',
              qoute:
                'وإنّ امرأ يقتل لغته وبيانها وآخر يقتل نفسه لمثلان، والثاني أعقل الرجلين.',
            },
          ],
          fontType: 'نسخ',
          fontColor: '#000',
          backgroundColor: 'silver',
        },
      ],
      order = { name, phone, address, products } as OrderType;
    test('remove Order successfully', async () => {
      const { status, errMsg } = responseInfo.remove(order);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, remove is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.remove(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
    });
  });
});
