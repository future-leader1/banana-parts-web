/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardImageDto } from './BoardImageDto';
import type { BoardType } from './BoardType';
import type { ReplyDto } from './ReplyDto';
import type { UserAuthorDto } from './UserAuthorDto';

export type BoardDto = {
  /**
   * 게시글 상태
   */
  status: BoardType;
  id: number;
  createdAt: string;
  user: UserAuthorDto;
  replies?: Array<ReplyDto>;
  replyTotalCounts?: number;
  userId: number;
  title: string;
  body?: string;
  boardImages?: Array<BoardImageDto>;
};
