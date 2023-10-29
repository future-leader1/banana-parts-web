/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ManufactorDto } from './ManufactorDto';

export type DealerDto = {
  id: number;
  createdAt: string;
  name: string;
  logoUrl?: string;
  phoneNumber?: string;
  fax?: string;
  address: string;
  manufactorId: number;
  manufactor: ManufactorDto;
};
