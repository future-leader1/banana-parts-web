/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductDto } from './ProductDto';

export type BookMarkDto = {
  id: number;
  userId: number;
  productId: number;
  product: ProductDto;
};
