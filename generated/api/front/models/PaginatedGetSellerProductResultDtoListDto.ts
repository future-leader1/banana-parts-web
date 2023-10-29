/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetSellerProductResultDto } from './GetSellerProductResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetSellerProductResultDtoListDto = {
  items: Array<GetSellerProductResultDto>;
  pagination: PaginationMetaData;
};
