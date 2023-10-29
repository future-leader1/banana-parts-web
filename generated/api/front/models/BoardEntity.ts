/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardImageEntity } from './BoardImageEntity';
import type { ReplyEntity } from './ReplyEntity';
import type { UserEntity } from './UserEntity';

export type BoardEntity = {
  userId: number;
  title: string;
  body?: string;
  status: BoardEntity.status;
  user: UserEntity;
  replies: Array<ReplyEntity>;
  boardImages: Array<BoardImageEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace BoardEntity {
  export enum status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
  }
}
