/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';
import type { WikiCategoryEntity } from './WikiCategoryEntity';
import type { WikiCommentEntity } from './WikiCommentEntity';
import type { WikiParagraphEntity } from './WikiParagraphEntity';
import type { WikiRequestHistoryEntity } from './WikiRequestHistoryEntity';
import type { WikiTagJoinWikiEntity } from './WikiTagJoinWikiEntity';
import type { WriterInfoEntity } from './WriterInfoEntity';

export type WikiEntity = {
  title: string;
  thumbnail: string;
  outline: string;
  etc?: string;
  source?: string;
  viewCount: number;
  isDeleted: boolean;
  deletedAt?: string;
  writerInfoId: number;
  writerInfo: WriterInfoEntity;
  userId: number;
  user: UserEntity;
  wikiCategoryId: number;
  wikiCategory: WikiCategoryEntity;
  wikiTagJoinWikis: Array<WikiTagJoinWikiEntity>;
  paragraphs: Array<WikiParagraphEntity>;
  comments: Array<WikiCommentEntity>;
  wikiRequestHistories: Array<WikiRequestHistoryEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};
