/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalType } from './ApprovalType';
import type { Role } from './Role';
import type { SellerInfoDto } from './SellerInfoDto';
import type { WriterRole } from './WriterRole';

export type GetUserResultDto = {
  role: Role;
  writerRole: WriterRole;
  approvalStatus: ApprovalType;
  id: number;
  createdAt: string;
  userId: string;
  email?: string;
  name: string;
  phoneNumber: string;
  isApproved: boolean;
  isPrivacyAgreed: boolean;
  sellerInfoId?: number;
  sellerInfos: Array<SellerInfoDto>;
  isDeleted: boolean;
};
