/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiCommentEntity } from './WikiCommentEntity';

export type WikiCommentImageEntity = {
  wikiId: number;
  wikiCommentId: number;
  imageUrl: string;
  sorted: number;
  wikiComment: WikiCommentEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
