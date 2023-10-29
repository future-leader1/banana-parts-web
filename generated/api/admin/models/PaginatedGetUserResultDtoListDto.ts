/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetUserResultDto } from './GetUserResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetUserResultDtoListDto = {
  items: Array<GetUserResultDto>;
  pagination: PaginationMetaData;
};
