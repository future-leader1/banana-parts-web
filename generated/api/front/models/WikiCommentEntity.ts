/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';
import type { WikiCommentImageEntity } from './WikiCommentImageEntity';
import type { WikiEntity } from './WikiEntity';

export type WikiCommentEntity = {
  userId: number;
  wikiId: number;
  parentsId?: number;
  body?: string;
  isDeleted: boolean;
  wikiCommentImages: Array<WikiCommentImageEntity>;
  user: UserEntity;
  wiki: WikiEntity;
  children?: Array<WikiCommentEntity>;
  parents?: WikiCommentEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
