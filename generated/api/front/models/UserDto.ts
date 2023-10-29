/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { SellerInfoDto } from './SellerInfoDto';
import type { WriterRole } from './WriterRole';

export type UserDto = {
  role: Role;
  writerRole: WriterRole;
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  email?: string;
  isPhoneNumberVisible: boolean;
  isVerifiedPhone: boolean;
  isMarketingAgreed: boolean;
  isPrivacyAgreed: boolean;
  userImage?: string;
  estimateRequestCount: number;
  estimateResponseCount: number;
  quotationCount: number;
  rejectCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
  sellerInfos: Array<SellerInfoDto>;
};
