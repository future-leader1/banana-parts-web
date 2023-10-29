/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentUserDto } from './CommentUserDto';
import type { WikiCommentImageDetailDto } from './WikiCommentImageDetailDto';

export type WikiCommentDetailDto = {
  user: CommentUserDto;
  wikiCommentImages: Array<WikiCommentImageDetailDto>;
  children?: Array<WikiCommentDetailDto>;
  id: number;
  createdAt: string;
  updatedAt: string;
  body?: string;
  isDeleted: boolean;
  parentsId?: number;
};
