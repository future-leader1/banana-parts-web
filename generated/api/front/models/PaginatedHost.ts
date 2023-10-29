/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetExpertWikiResultDto } from './GetExpertWikiResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedHost = {
  items: Array<GetExpertWikiResultDto>;
  pagination: PaginationMetaData;
};
