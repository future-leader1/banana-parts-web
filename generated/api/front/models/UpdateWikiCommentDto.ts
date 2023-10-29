/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateWikiCommentImageDto } from './UpdateWikiCommentImageDto';

export type UpdateWikiCommentDto = {
  images: Array<UpdateWikiCommentImageDto>;
  body?: string;
};
