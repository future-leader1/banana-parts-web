/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalType } from './ApprovalType';
import type { Role } from './Role';
import type { WriterRole } from './WriterRole';

export type BuyerDto = {
  role: Role;
  writerRole: WriterRole;
  approvalStatus: ApprovalType;
  id: number;
  createdAt: string;
  userId: string;
  email?: string;
  name: string;
  phoneNumber: string;
  userImage?: string;
  isPhoneNumberVisible: boolean;
  sellerInfoId?: number;
  isApproved: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
};
