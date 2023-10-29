/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { ProductDto } from './ProductDto';

export type PaginatedProductEntityListDto = {
  items: Array<ProductDto>;
  pagination: PaginationMetaData;
};
