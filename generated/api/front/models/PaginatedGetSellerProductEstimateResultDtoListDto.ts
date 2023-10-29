/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetSellerProductEstimateResultDto } from './GetSellerProductEstimateResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetSellerProductEstimateResultDtoListDto = {
  items: Array<GetSellerProductEstimateResultDto>;
  pagination: PaginationMetaData;
};
