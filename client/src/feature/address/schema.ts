import { z } from 'zod';

export const zipCodeSchema = z.string().regex(/^\d{7}$/, '郵便番号は7桁の数字で入力してください。');

export const addressSchema = z.object({
  address1: z.string(),
  address2: z.string(),
  address3: z.string(),
});

export const addressResponseSchema = z.object({
  results: z.array(addressSchema).nullable(),
});

export type AddressData = z.infer<typeof addressSchema>;