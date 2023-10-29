/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardEntity } from './BoardEntity';
import type { BoardImageEntity } from './BoardImageEntity';
import type { UserEntity } from './UserEntity';

export type ReplyEntity = {
  userId: number;
  boardId: number;
  parentsId?: number;
  body?: string;
  isDeleted: boolean;
  replyImages: Array<BoardImageEntity>;
  user: UserEntity;
  board: BoardEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
