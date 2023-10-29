/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyWikiDto } from './MyWikiDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedMyWikiDtoListDto = {
  items: Array<MyWikiDto>;
  pagination: PaginationMetaData;
};
