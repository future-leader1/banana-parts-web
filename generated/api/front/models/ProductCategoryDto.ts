/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryTagDto } from './CategoryTagDto';

export type ProductCategoryDto = {
  id: number;
  createdAt: string;
  productId: number;
  categoryTagId: number;
  categoryTag: CategoryTagDto;
};
