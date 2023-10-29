/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminNewsDto } from './AdminNewsDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedAdminNewsDtoListDto = {
  items: Array<AdminNewsDto>;
  pagination: PaginationMetaData;
};
