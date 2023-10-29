/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AllWikiDto } from './AllWikiDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedAllWikiDtoListDto = {
  items: Array<AllWikiDto>;
  pagination: PaginationMetaData;
};
