/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserNoticeType } from './UserNoticeType';

export type UpdateSellerInfoDto = {
  noticeType: UserNoticeType;
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
};
