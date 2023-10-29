/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminWikiRequestHistoryDto } from './AdminWikiRequestHistoryDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedWikiRequestHistoryEntityListDto = {
  items: Array<AdminWikiRequestHistoryDto>;
  pagination: PaginationMetaData;
};
