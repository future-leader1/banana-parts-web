/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetProductEstimateResultDto } from './GetProductEstimateResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetProductEstimateResultDtoListDto = {
  items: Array<GetProductEstimateResultDto>;
  pagination: PaginationMetaData;
};
