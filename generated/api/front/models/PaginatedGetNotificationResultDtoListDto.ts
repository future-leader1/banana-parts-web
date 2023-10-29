/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetNotificationResultDto } from './GetNotificationResultDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedGetNotificationResultDtoListDto = {
  items: Array<GetNotificationResultDto>;
  pagination: PaginationMetaData;
};
