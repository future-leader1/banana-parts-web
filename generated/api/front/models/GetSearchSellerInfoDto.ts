/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalType } from './ApprovalType';
import type { GetSellerInfoResultUserDto } from './GetSellerInfoResultUserDto';
import type { UserNoticeType } from './UserNoticeType';

export type GetSearchSellerInfoDto = {
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
  userId: number;
  rejectMessage?: string;
  user: GetSellerInfoResultUserDto;
};
