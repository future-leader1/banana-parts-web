/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ManufactorDto } from './ManufactorDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedManufactorListDto = {
  items: Array<ManufactorDto>;
  pagination: PaginationMetaData;
};
