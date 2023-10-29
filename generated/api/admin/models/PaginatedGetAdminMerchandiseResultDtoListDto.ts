/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetAdminMerchandiseResultDto } from './GetAdminMerchandiseResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetAdminMerchandiseResultDtoListDto = {
  items: Array<GetAdminMerchandiseResultDto>;
  pagination: PaginationMetaData;
};
