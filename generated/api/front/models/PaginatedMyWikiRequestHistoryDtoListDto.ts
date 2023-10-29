/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyWikiRequestHistoryDto } from './MyWikiRequestHistoryDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedMyWikiRequestHistoryDtoListDto = {
  items: Array<MyWikiRequestHistoryDto>;
  pagination: PaginationMetaData;
};
