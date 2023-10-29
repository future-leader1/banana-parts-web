/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewsDto } from './NewsDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedNewsDtoListDto = {
  items: Array<NewsDto>;
  pagination: PaginationMetaData;
};
