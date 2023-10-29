/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { SearchProductResultDto } from './SearchProductResultDto';

export type PaginatedSearchProductResultDtoListDto = {
  items: Array<SearchProductResultDto>;
  pagination: PaginationMetaData;
};
