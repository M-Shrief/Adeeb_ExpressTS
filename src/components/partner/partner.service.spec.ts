import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PartnerService } from './partner.service';
// Repository
import { PartnerDB } from './partner.repository';
// Types
import { PartnerType } from '../../interfaces/partner.interface';
// Utils
import { hashPassword } from '../../utils/auth';

describe.concurrent('Testing PartnerService', async () => {
  describe('Testing getInfo()', async () => {
    const partnerInfo = {
      _id: '64b9a77a87178b22560a8e73',
      name: 'The Den Man',
      phone: '01235554567',
    } as unknown as PartnerType;
    test('Gets data successfully from database', async () => {
      vi.spyOn(PartnerDB, 'getInfo').mockResolvedValue(partnerInfo);
      const result = await PartnerService.getInfo(
        '3251fb4d-aab0-4639-b049-815745ee7531',
      );
      expect(result).toStrictEqual(partnerInfo);
    });
    test('Returns false if data in not fount', async () => {
      vi.spyOn(PartnerDB, 'getInfo').mockResolvedValue(null);
      const result = await PartnerService.getInfo(
        '3251fb4d-aab0-4639-b049-815745ee7531',
      );
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing signup()', async () => {
    let name = 'E2E Test',
      phone = '01235554567',
      password = 'P@ssword1',
      hashed = await hashPassword(password);
    test('SignUp successfully after validation and hashing password', async () => {
      vi.spyOn(PartnerDB, 'signup').mockResolvedValue({
        name,
        phone,
        password: hashed,
      } as PartnerType);
      const result = await PartnerService.signup({
        name,
        phone,
        password,
      } as PartnerType);
      expect(result).toStrictEqual({
        name,
        phone,
        password: hashed,
      } as PartnerType);
    });
    test('Returns false after inValid data', async () => {
      vi.spyOn(PartnerDB, 'signup').mockResolvedValue({
        name,
        phone,
        password: hashed,
      } as PartnerType);

      const result1 = await PartnerService.signup({
        name,
        phone,
      } as PartnerType);
      expect(result1).toEqual(false);
      const result2 = await PartnerService.signup({
        name,
        password,
      } as PartnerType);
      expect(result2).toEqual(false);
      const result3 = await PartnerService.signup({
        phone,
        password,
      } as PartnerType);
      expect(result3).toEqual(false);
    });
  });

  describe('Testing login()', async () => {
    let phone = '01235554567',
      password = 'P@ssword1',
      hashed = await hashPassword(password);
    test('SignUp successfully after validation and hashing password', async () => {
      vi.spyOn(PartnerDB, 'login').mockResolvedValue({
        phone,
        password: hashed,
      } as PartnerType);
      const result = await PartnerService.login(phone, password);
      expect(result).toStrictEqual({ phone, password: hashed } as PartnerType);
    });
    test('Returns false after for non-existing phone or inValid password', async () => {
      vi.spyOn(PartnerDB, 'login').mockResolvedValue(null);
      const result = await PartnerService.login(phone, password);
      expect(result).toEqual(false);
    });
    test('Returns false after for non-existing phone or inValid password', async () => {
      // not equal the hashed password in DB
      vi.spyOn(PartnerDB, 'login').mockResolvedValue({
        phone,
        password,
      } as PartnerType);
      const result = await PartnerService.login(phone, password);
      expect(result).toEqual(false);
    });
  });

  describe('Testing update()', async () => {
    let _id = '64b9a77a87178b22560a8e73',
      name = 'The Den Man',
      phone = '01235554567',
      password = 'P@ssword1',
      partner = { _id, name, phone } as unknown as PartnerType;
    test('Updated Partner data successfully after validation and hashing password', async () => {
      vi.spyOn(PartnerDB, 'update').mockResolvedValue(partner);
      const result1 = await PartnerService.update('1', { name } as PartnerType);
      expect(result1).toStrictEqual(partner);
      const result2 = await PartnerService.update('1', {
        phone,
      } as PartnerType);
      expect(result2).toStrictEqual(partner);
      const result3 = await PartnerService.update('1', {
        password,
      } as PartnerType);
      expect(result3).toStrictEqual(partner);
    });
    test('return false if partner is not found', async () => {
      vi.spyOn(PartnerDB, 'update').mockResolvedValue(null);
      const result1 = await PartnerService.update('1', { name } as PartnerType);
      expect(result1).toEqual(false);
      const result2 = await PartnerService.update('1', {
        phone,
      } as PartnerType);
      expect(result2).toEqual(false);
      const result3 = await PartnerService.update('1', {
        password,
      } as PartnerType);
      expect(result3).toEqual(false);
    });
    test('Returns false after inValid data', async () => {
      vi.spyOn(PartnerDB, 'update').mockResolvedValue(partner);

      const result1 = await PartnerService.update('1', {
        name: 'sd',
      } as PartnerType);
      expect(result1).toEqual(false);
      const result2 = await PartnerService.update('1', {
        phone: 'sd',
      } as PartnerType);
      expect(result2).toEqual(false);
      const result3 = await PartnerService.update('1', {
        password: 'sd',
      } as PartnerType);
      expect(result3).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    let _id = '64b9a77a87178b22560a8e73',
      name = 'The Den Man',
      phone = '01235554567',
      password = 'P@ssword1',
      partner = { _id, name, phone } as unknown as PartnerType;
    test('Successfully deletes poem', async () => {
      vi.spyOn(PartnerDB, 'remove').mockResolvedValue(partner);

      const result1 = await PartnerService.remove('64b9a77a87178b22560a8e73');
      expect(result1).toEqual(partner);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(PartnerDB, 'remove').mockResolvedValue(null);

      const result1 = await PartnerService.remove('64b9a77a87178b22560a8ed2');
      expect(result1).toEqual(false);
    });
  });
});
