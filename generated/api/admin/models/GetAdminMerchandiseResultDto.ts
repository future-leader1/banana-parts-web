/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MerchandiseProductDto } from './MerchandiseProductDto';
import type { UserDto } from './UserDto';

export type GetAdminMerchandiseResultDto = {
  id: number;
  createdAt: string;
  sellerId: number;
  productId: number;
  product: MerchandiseProductDto;
  seller: UserDto;
};
