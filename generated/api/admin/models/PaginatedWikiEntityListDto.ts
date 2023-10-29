/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminWikiDto } from './AdminWikiDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedWikiEntityListDto = {
  items: Array<AdminWikiDto>;
  pagination: PaginationMetaData;
};
