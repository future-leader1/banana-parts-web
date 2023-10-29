/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductCategoryTagEntity } from './ProductCategoryTagEntity';

export type CategoryTagEntity = {
  name: string;
  productCategoryTags: Array<ProductCategoryTagEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};
