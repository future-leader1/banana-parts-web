/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardEntity } from './BoardEntity';
import type { ReplyEntity } from './ReplyEntity';

export type BoardImageEntity = {
  boardId: number;
  replyId: number;
  imageUrl: string;
  sorted: number;
  board: BoardEntity;
  reply: ReplyEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
