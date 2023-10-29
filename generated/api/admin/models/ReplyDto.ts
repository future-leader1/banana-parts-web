/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardImageDto } from './BoardImageDto';
import type { UserAuthorDto } from './UserAuthorDto';

export type ReplyDto = {
  id: number;
  createdAt: string;
  userId: number;
  boardId: number;
  parentsId?: number;
  body?: string;
  isDeleted: boolean;
  replyImages?: Array<BoardImageDto>;
  user: UserAuthorDto;
  replies?: Array<ReplyDto>;
};
