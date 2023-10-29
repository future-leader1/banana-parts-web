/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type AdminUserSignupResultDto = {
  role: Role;
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  isMarketingAgreed: boolean;
  userImage?: string;
  estimateRequestCount: number;
  estimateResponseCount: number;
  quotationCount: number;
  rejectCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
};
