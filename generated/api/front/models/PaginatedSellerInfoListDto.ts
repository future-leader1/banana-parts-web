/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { ProductSellerInfoDto } from './ProductSellerInfoDto';

export type PaginatedSellerInfoListDto = {
  items: Array<ProductSellerInfoDto>;
  pagination: PaginationMetaData;
};
