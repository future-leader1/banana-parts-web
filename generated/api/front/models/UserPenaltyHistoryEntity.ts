/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type UserPenaltyHistoryEntity = {
  penaltyUserId: number;
  issuedUserId: number;
  status: UserPenaltyHistoryEntity.status;
  penaltyTitle: string;
  penaltyBody: string;
  adminMemo?: string;
  penaltyUser: UserEntity;
  issuedUser: UserEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace UserPenaltyHistoryEntity {
  export enum status {
    BEFOREPROGRESS = 'BEFOREPROGRESS',
    DONE = 'DONE',
  }
}
