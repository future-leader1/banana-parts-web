/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalType } from './ApprovalType';
import type { GetSellerInfoUserResultDto } from './GetSellerInfoUserResultDto';
import type { UserNoticeType } from './UserNoticeType';

export type GetSellerInfoResultDto = {
  noticeType: UserNoticeType;
  status: ApprovalType;
  id: number;
  company: string;
  department: string;
  position: string;
  email: string;
  zipCode: string;
  countryCode: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  telNumber?: string;
  fax?: string;
  homepageUrl?: string;
  businessNumber: string;
  businessRegistration: string;
  companyInfo?: string;
  rejectMessage?: string;
  userId: number;
  user: GetSellerInfoUserResultDto;
};
