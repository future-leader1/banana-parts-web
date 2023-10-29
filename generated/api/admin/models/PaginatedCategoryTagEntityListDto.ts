/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryTagDto } from './CategoryTagDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedCategoryTagEntityListDto = {
  items: Array<CategoryTagDto>;
  pagination: PaginationMetaData;
};
