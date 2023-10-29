/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { SellerInfoDto } from './SellerInfoDto';

export type PaginatedSellerInfoEntityListDto = {
  items: Array<SellerInfoDto>;
  pagination: PaginationMetaData;
};
