/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type GetBuyerDto = {
  role: Role;
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  userImage?: string;
  estimateRequestCount: number;
  quotationCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
};
