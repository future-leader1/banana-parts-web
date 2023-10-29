/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { WikiSearchResultDto } from './WikiSearchResultDto';

export type PaginatedWikiSearchResultDtoListDto = {
  items: Array<WikiSearchResultDto>;
  pagination: PaginationMetaData;
};
