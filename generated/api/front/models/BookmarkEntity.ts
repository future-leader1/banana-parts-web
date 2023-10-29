/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEntity } from './ProductEntity';
import type { UserEntity } from './UserEntity';

export type BookmarkEntity = {
  userId: number;
  productId: number;
  user: UserEntity;
  product: ProductEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
