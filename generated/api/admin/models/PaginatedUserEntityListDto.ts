/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationMetaData } from './PaginationMetaData';
import type { UserDto } from './UserDto';

export type PaginatedUserEntityListDto = {
  items: Array<UserDto>;
  pagination: PaginationMetaData;
};
