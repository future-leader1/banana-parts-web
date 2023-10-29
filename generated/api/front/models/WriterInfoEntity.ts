/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';
import type { WikiEntity } from './WikiEntity';

export type WriterInfoEntity = {
  userName: string;
  department: string;
  certification: string;
  alarmType: WriterInfoEntity.alarmType;
  status: WriterInfoEntity.status;
  role: WriterInfoEntity.role;
  rejectMessage?: string;
  isAgree: boolean;
  userId: number;
  user: UserEntity;
  wikis: Array<WikiEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace WriterInfoEntity {
  export enum alarmType {
    NOT_RECEIVE = 'NOT_RECEIVE',
    KAKAO = 'KAKAO',
    EMAIL = 'EMAIL',
  }

  export enum status {
    NONE = 'NONE',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
  }

  export enum role {
    NONE = 'NONE',
    WRITER = 'WRITER',
    EXPERT = 'EXPERT',
  }
}
