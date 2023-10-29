/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { ProductIdsResultDto } from './ProductIdsResultDto';

export type PaginatedProductIdsResultDtoListDto = {
  items: Array<ProductIdsResultDto>;
  pagination: PaginationMetaData;
};
