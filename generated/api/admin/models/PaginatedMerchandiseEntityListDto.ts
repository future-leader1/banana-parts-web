/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MerchandiseDto } from './MerchandiseDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedMerchandiseEntityListDto = {
  items: Array<MerchandiseDto>;
  pagination: PaginationMetaData;
};
