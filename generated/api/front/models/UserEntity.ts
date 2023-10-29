/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardEntity } from './BoardEntity';
import type { BookmarkEntity } from './BookmarkEntity';
import type { MerchandiseEntity } from './MerchandiseEntity';
import type { NotificationEntity } from './NotificationEntity';
import type { ProductEstimateEntity } from './ProductEstimateEntity';
import type { RegisterRequestHistoryEntity } from './RegisterRequestHistoryEntity';
import type { ReplyEntity } from './ReplyEntity';
import type { SellerInfoEntity } from './SellerInfoEntity';
import type { UserPenaltyHistoryEntity } from './UserPenaltyHistoryEntity';
import type { WikiEntity } from './WikiEntity';
import type { WikiRequestHistoryEntity } from './WikiRequestHistoryEntity';
import type { WriterInfoEntity } from './WriterInfoEntity';

export type UserEntity = {
  userId: string;
  email?: string;
  password: string;
  role: UserEntity.role;
  writerRole: UserEntity.writerRole;
  approvalStatus: UserEntity.approvalStatus;
  isVerifiedPhone: boolean;
  isApproved: boolean;
  name: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  userImage: string;
  isMarketingAgreed: boolean;
  isPrivacyAgreed: boolean;
  isDeleted: boolean;
  deletedAt: string;
  estimateRequestCount: number;
  estimateResponseCount: number;
  quotationCount: number;
  sellerQuotationCount: number;
  rejectCount: number;
  rejectedCount: number;
  sellerInfoId?: number;
  recommendId?: string;
  sellerInfos: Array<SellerInfoEntity>;
  merchandises: Array<MerchandiseEntity>;
  bookmarks: Array<BookmarkEntity>;
  registerRequestHistories: Array<RegisterRequestHistoryEntity>;
  sendNotifications: Array<NotificationEntity>;
  receiveNotifications: Array<NotificationEntity>;
  buyerProductEstimates: Array<ProductEstimateEntity>;
  sellerProductEstimates: Array<ProductEstimateEntity>;
  userPenalties: Array<UserPenaltyHistoryEntity>;
  userIssueHistories: Array<UserPenaltyHistoryEntity>;
  boards: Array<BoardEntity>;
  replies: Array<ReplyEntity>;
  writerInfos: Array<WriterInfoEntity>;
  wikis: Array<WikiEntity>;
  wikiRequestHistories: Array<WikiRequestHistoryEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace UserEntity {
  export enum role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SELLER = 'SELLER',
  }

  export enum writerRole {
    NONE = 'NONE',
    WRITER = 'WRITER',
    EXPERT = 'EXPERT',
  }

  export enum approvalStatus {
    NONE = 'NONE',
    PENDING = 'PENDING',
    CORRECTION = 'CORRECTION',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
  }
}
