/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardDto } from './BoardDto';
import type { PaginationMetaData } from './PaginationMetaData';

export type PaginatedBoardDtoListDto = {
  items: Array<BoardDto>;
  pagination: PaginationMetaData;
};
