// Models
import Partner from './partner.model';
// Types
import { PartnerType } from '../../interfaces/partner.interface';
// Utils
import { comparePassword, hashPassword } from '../../utils/auth';
// Schema
import { createSchema, updateSchema } from './partner.schema';
export class PartnerService {
  public async getInfo(id: string): Promise<PartnerType | false> {
    const partner = await Partner.findById(id, {
      name: 1,
      address: 1,
      phone: 1,
    });

    if (!partner) return false;
    return partner;
  }

  public async signup(partnerData: PartnerType): Promise<PartnerType | false> {
    const isValid = await createSchema.isValid(partnerData);
    if (!isValid) return false;
    const password = await hashPassword(partnerData.password);

    const partner = new Partner({
      name: partnerData.name,
      phone: partnerData.phone,
      password,
    });

    const newPartner = await partner.save();
    if (!newPartner) return false;
    return partner;
  }

  public async login(
    phone: string,
    password: string,
  ): Promise<PartnerType | false> {
    const existingPartner = await Partner.findOne(
      { phone },
      { name: 1, phone: 1,  password: 1 },
    );
    if (!existingPartner) return false;

    const isValid = comparePassword(password, existingPartner.password);
    if (!isValid) return false;

    return existingPartner;
  }

  public async update(
    id: string,
    partnerData: PartnerType,
  ): Promise<PartnerType | false> {
    const isValid = await updateSchema.isValid(partnerData);
    if (!isValid) return false;
    const partner = await Partner.findById(id);
    if (!partner) return false;
    const newPartner = await partner.updateOne({ $set: partnerData });
    if (!newPartner) return false;
    return newPartner;
  }

  public async remove(id: string): Promise<PartnerType | false> {
    const partner = await Partner.findByIdAndRemove(id);
    if (!partner) return false;
    return partner;
  }
}
