/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type NotificationEntity = {
  type: NotificationEntity.type;
  isRead: boolean;
  productEstimateId?: number;
  boardId?: number;
  wikiId?: number;
  senderId: number;
  receiverId: number;
  sender: UserEntity;
  receiver: UserEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace NotificationEntity {
  export enum type {
    ESTIMATION_REQUESTED = 'ESTIMATION_REQUESTED',
    QUOTATION_APPROVED = 'QUOTATION_APPROVED',
    QUOTATION_REJECTED = 'QUOTATION_REJECTED',
    SELLER_APPROVED = 'SELLER_APPROVED',
    SELLER_REJECTED = 'SELLER_REJECTED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    WIKI_OPINION = 'WIKI_OPINION',
    WIKI_EDITED = 'WIKI_EDITED',
    WIKI_DELETED = 'WIKI_DELETED',
    WIKI_COMMENT_ADDED = 'WIKI_COMMENT_ADDED',
  }
}
