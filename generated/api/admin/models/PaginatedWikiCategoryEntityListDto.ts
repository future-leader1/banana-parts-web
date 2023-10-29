/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { WikiCategoryDto } from './WikiCategoryDto';

export type PaginatedWikiCategoryEntityListDto = {
  items: Array<WikiCategoryDto>;
  pagination: PaginationMetaData;
};
