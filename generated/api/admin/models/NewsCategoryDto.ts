/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChildNewsCategoryDto } from './ChildNewsCategoryDto';

export type NewsCategoryDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  ordering?: number;
  parentCategoryId?: number;
  twoDepthCategories: Array<ChildNewsCategoryDto>;
};
