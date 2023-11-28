// Models
import Partner from './partner.model';
// Types
import { PartnerType } from '../../interfaces/partner.interface';

export const PartnerDB = {
  async getInfo(id: string): Promise<PartnerType | null> {
    return await Partner.findById(id, {
      name: 1,
      address: 1,
      phone: 1,
    });
  },

  async signup(partnerData: PartnerType): Promise<PartnerType> {
    const partner = new Partner({ ...partnerData });
    return await partner.save();
  },

  async login(phone: string): Promise<PartnerType | null> {
    return await Partner.findOne({ phone }, { name: 1, phone: 1, password: 1 });
  },

  async update(
    id: string,
    partnerData: PartnerType,
  ): Promise<PartnerType | null> {
    return await Partner.findByIdAndUpdate(id, { $set: partnerData });
  },

  async remove(id: string): Promise<PartnerType | null> {
    return await Partner.findByIdAndRemove(id);
  },
};
