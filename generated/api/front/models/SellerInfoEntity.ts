/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEstimateEntity } from './ProductEstimateEntity';
import type { UserEntity } from './UserEntity';

export type SellerInfoEntity = {
  company: string;
  department: string;
  position: string;
  countryCode: string;
  postCode: string;
  noticeType: SellerInfoEntity.noticeType;
  email: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  telNumber?: string;
  fax?: string;
  homepageUrl?: string;
  businessNumber: string;
  businessRegistration: string;
  companyInfo?: string;
  status: SellerInfoEntity.status;
  rejectMessage?: string;
  userId: number;
  user: UserEntity;
  productEstimates: Array<ProductEstimateEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace SellerInfoEntity {
  export enum noticeType {
    MESSAGE = 'MESSAGE',
    EMAIL = 'EMAIL',
  }

  export enum status {
    NONE = 'NONE',
    PENDING = 'PENDING',
    CORRECTION = 'CORRECTION',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
  }
}
