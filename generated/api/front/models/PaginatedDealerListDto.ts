/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DealerDto } from './DealerDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedDealerListDto = {
  items: Array<DealerDto>;
  pagination: PaginationMetaData;
};
