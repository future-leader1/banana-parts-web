/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryTagEntity } from './CategoryTagEntity';
import type { ProductEntity } from './ProductEntity';

export type ProductCategoryTagEntity = {
  categoryTagId: number;
  productId: number;
  categoryTag: CategoryTagEntity;
  product: ProductEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
