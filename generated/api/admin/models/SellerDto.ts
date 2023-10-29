/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalType } from './ApprovalType';
import type { Role } from './Role';
import type { WriterRole } from './WriterRole';

export type SellerDto = {
  role: Role;
  writerRole: WriterRole;
  approvalStatus: ApprovalType;
  id: number;
  createdAt: string;
  userId: string;
  name: string;
  email?: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  isApproved: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  sellerInfoId?: number;
};
