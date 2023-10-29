/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetSearchSellerInfoDto } from './GetSearchSellerInfoDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedsearchSellerInfoListDto = {
  items: Array<GetSearchSellerInfoDto>;
  pagination: PaginationMetaData;
};
