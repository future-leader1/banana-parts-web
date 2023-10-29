/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { UserPenaltyHistoryDto } from './UserPenaltyHistoryDto';

export type PaginatedUserPenaltyHistoryEntityListDto = {
  items: Array<UserPenaltyHistoryDto>;
  pagination: PaginationMetaData;
};
