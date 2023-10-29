/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { WriterRole } from './WriterRole';

export type GetSellerInfoResultUserDto = {
  role: Role;
  writerRole: WriterRole;
  id: number;
  name: string;
  email?: string;
  phoneNumber: string;
  userImage?: string;
  sellerInfoId?: number;
  isPhoneNumberVisible: boolean;
};
