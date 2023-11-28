// Repository
import { PartnerDB } from './partner.repository';
// Types
import { PartnerType } from '../../interfaces/partner.interface';
// Utils
import { comparePassword, hashPassword } from '../../utils/auth';
// Schema
import { createSchema, updateSchema } from './partner.schema';

export const PartnerService = {
  async getInfo(id: string): Promise<PartnerType | false> {
    const partner = await PartnerDB.getInfo(id);

    if (!partner) return false;
    return partner;
  },

  async signup(partnerData: PartnerType): Promise<PartnerType | false> {
    const isValid = await createSchema.isValid(partnerData);
    if (!isValid) return false;
    const password = await hashPassword(partnerData.password);

    const newPartner = await PartnerDB.signup({
      name: partnerData.name,
      phone: partnerData.phone,
      password,
    } as PartnerType);
    if (!newPartner) return false;
    return newPartner;
  },

  async login(phone: string, password: string): Promise<PartnerType | false> {
    const existingPartner = await PartnerDB.login(phone);
    if (!existingPartner) return false;

    const isValid = await comparePassword(password, existingPartner.password);
    if (!isValid) return false;

    return existingPartner;
  },

  async update(
    id: string,
    partnerData: PartnerType,
  ): Promise<PartnerType | false> {
    const isValid = await updateSchema.isValid(partnerData);
    if (!isValid) return false;
    const newPartner = await PartnerDB.update(id, partnerData);
    if (!newPartner) return false;
    return newPartner;
  },

  async remove(id: string): Promise<PartnerType | false> {
    const partner = await PartnerDB.remove(id);
    if (!partner) return false;
    return partner;
  },
};
