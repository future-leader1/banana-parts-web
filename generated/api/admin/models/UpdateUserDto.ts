/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { SellerInfoDto } from './SellerInfoDto';
import type { WriterRole } from './WriterRole';

export type UpdateUserDto = {
  role?: Role;
  writerRole?: WriterRole;
  password?: string;
  id?: number;
  createdAt?: string;
  userId?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  isPhoneNumberVisible?: boolean;
  isVerifiedPhone?: boolean;
  isMarketingAgreed?: boolean;
  isPrivacyAgreed?: boolean;
  userImage?: string;
  recommendId?: string;
  estimateRequestCount?: number;
  estimateResponseCount?: number;
  sellerQuotationCount?: number;
  quotationCount?: number;
  rejectCount?: number;
  rejectedCount?: number;
  sellerInfoId?: number;
  isDeleted?: boolean;
  deletedAt?: string;
  sellerInfos?: Array<SellerInfoDto>;
};
