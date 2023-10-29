/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewsCategoryJoinNewsDto } from './NewsCategoryJoinNewsDto';

export type AdminNewsDetailDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  wroteAt: string;
  headline: string;
  content: string;
  link: string;
  imageUrl: string;
  viewCount: number;
  newsCategoryJoinNews: Array<NewsCategoryJoinNewsDto>;
};
