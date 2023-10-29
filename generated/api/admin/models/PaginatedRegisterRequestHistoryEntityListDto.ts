/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { RegisterRequestHistoryDto } from './RegisterRequestHistoryDto';

export type PaginatedRegisterRequestHistoryEntityListDto = {
  items: Array<RegisterRequestHistoryDto>;
  pagination: PaginationMetaData;
};
