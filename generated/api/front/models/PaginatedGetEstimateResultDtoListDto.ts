/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetEstimateResultDto } from './GetEstimateResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetEstimateResultDtoListDto = {
  items: Array<GetEstimateResultDto>;
  pagination: PaginationMetaData;
};
