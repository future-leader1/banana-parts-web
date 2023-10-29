/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateWikiCommentImageDto } from './CreateWikiCommentImageDto';

export type CreateWikiCommentDto = {
  wikiId: number;
  parentsId?: number;
  body: string;
  images?: Array<CreateWikiCommentImageDto>;
};
