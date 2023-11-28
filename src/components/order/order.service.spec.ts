import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { OrderService } from './order.service';
// Repository
import { OrderDB } from './order.repository';
// Types
import { OrderType } from '../../interfaces/order.interface';

describe.concurrent('Testing PartnerService', async () => {
  describe('Testing getGuestOrders()', async () => {
    const guestOrders = [
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
    test('Gets data successfully from database', async () => {
      vi.spyOn(OrderDB, 'getGuestOrders').mockResolvedValue(guestOrders);
      const result = await OrderService.getGuestOrders(
        'Guest Order',
        '01235554580',
      );
      expect(result).toStrictEqual(guestOrders);
    });
    test('Returns false if data in not fount', async () => {
      vi.spyOn(OrderDB, 'getGuestOrders').mockResolvedValue([]);
      const result = await OrderService.getGuestOrders(
        'Guest Order',
        '01235554580',
      );
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing getPartnerOrders()', async () => {
    const partnerOrders = [
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
    test('Gets data successfully from database', async () => {
      vi.spyOn(OrderDB, 'getPartnerOrders').mockResolvedValue(partnerOrders);
      const result = await OrderService.getPartnerOrders(
        '3251fb4d-aab0-4639-b049-815745ee7531',
      );
      expect(result).toStrictEqual(partnerOrders);
    });
    test('Returns false if data in not fount', async () => {
      vi.spyOn(OrderDB, 'getPartnerOrders').mockResolvedValue([]);
      const result = await OrderService.getPartnerOrders(
        '3251fb4d-aab0-4639-b049-815745ee7531',
      );
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing post()', async () => {
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
    test('Post guestOrder successfully after validation', async () => {
      vi.spyOn(OrderDB, 'post').mockResolvedValue(guestOrder);
      const result = await OrderService.post(guestOrder);
      expect(result).toStrictEqual(guestOrder);
    });
    test('Post partnerOrder successfully after validation', async () => {
      vi.spyOn(OrderDB, 'post').mockResolvedValue(partnerOrder);
      const result = await OrderService.post(partnerOrder);
      expect(result).toStrictEqual(partnerOrder);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(OrderDB, 'post').mockResolvedValue(partnerOrder);

      const result1 = await OrderService.post({ name } as OrderType);
      expect(result1).toStrictEqual(false);
      const result2 = await OrderService.post({ products } as OrderType);
      expect(result2).toStrictEqual(false);
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
    test('Update Order data successfully after validation', async () => {
      vi.spyOn(OrderDB, 'update').mockResolvedValue(order);

      const result1 = await OrderService.update('1', { name } as OrderType);
      expect(result1).toEqual(order);
      const result2 = await OrderService.update('1', {
        phone,
      } as unknown as OrderType);
      expect(result2).toEqual(order);
      const result3 = await OrderService.update('1', { address } as OrderType);
      expect(result3).toEqual(order);
    });
    test('return false after invalid orderData', async () => {
      vi.spyOn(OrderDB, 'update').mockResolvedValue(order);

      const result1 = await OrderService.update('1', {
        name: 'sa',
      } as OrderType);
      expect(result1).toEqual(false);
      const result2 = await OrderService.update('1', {
        phone: '214',
      } as OrderType);
      expect(result2).toEqual(false);
      const result3 = await OrderService.update('1', {
        address: '2fs',
      } as OrderType);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(OrderDB, 'update').mockResolvedValue(null);

      const result1 = await OrderService.update('1', { name } as OrderType);
      expect(result1).toEqual(false);
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
    test('Successfully deletes order', async () => {
      vi.spyOn(OrderDB, 'remove').mockResolvedValue(order);

      const result1 = await OrderService.remove(
        'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      );
      expect(result1).toEqual(order);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(OrderDB, 'remove').mockResolvedValue(null);

      const result1 = await OrderService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});
