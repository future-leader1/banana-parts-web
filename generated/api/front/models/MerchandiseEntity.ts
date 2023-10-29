/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEntity } from './ProductEntity';
import type { UserEntity } from './UserEntity';

export type MerchandiseEntity = {
  productId: number;
  sellerId: number;
  isHidden: boolean;
  seller: UserEntity;
  product: ProductEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
