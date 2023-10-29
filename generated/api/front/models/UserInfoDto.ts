/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { WriterRole } from './WriterRole';

export type UserInfoDto = {
  writerRole: WriterRole;
  role: Role;
  id: number;
  createdAt: string;
  userId: string;
  name: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  userImage?: string;
  estimateRequestCount: number;
  estimateResponseCount: number;
  quotationCount: number;
  rejectCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
};
