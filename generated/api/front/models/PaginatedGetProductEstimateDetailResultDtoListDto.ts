/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetProductEstimateDetailResultDto } from './GetProductEstimateDetailResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetProductEstimateDetailResultDtoListDto = {
  items: Array<GetProductEstimateDetailResultDto>;
  pagination: PaginationMetaData;
};
