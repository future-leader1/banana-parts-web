/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewsDto } from './NewsDto';

export type NewsByCategoryDto = {
  categoryName: string;
  news: Array<NewsDto>;
};
