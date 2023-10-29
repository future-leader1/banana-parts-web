/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { WikiCommentDetailDto } from './WikiCommentDetailDto';

export type PaginatedWikiCommentDetailDtoListDto = {
  items: Array<WikiCommentDetailDto>;
  pagination: PaginationMetaData;
};
