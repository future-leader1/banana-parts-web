/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { WriterRole } from './WriterRole';

export type GetSellerInfoUserResultDto = {
  role: Role;
  writerRole: WriterRole;
  id: number;
  createdAt: string;
  userId: string;
  name: string;
  phoneNumber: string;
  userImage?: string;
  estimateRequestCount: number;
  quotationCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
};
