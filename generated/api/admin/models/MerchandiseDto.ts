/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MerchandiseProductDto } from './MerchandiseProductDto';
import type { UserDto } from './UserDto';

export type MerchandiseDto = {
  id: number;
  createdAt: string;
  sellerId: number;
  seller: UserDto;
  productId: number;
  product: MerchandiseProductDto;
};
