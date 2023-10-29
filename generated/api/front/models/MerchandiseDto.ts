/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SearchProductResultDto } from './SearchProductResultDto';

export type MerchandiseDto = {
  id: number;
  sellerId: number;
  productId: number;
  product: SearchProductResultDto;
};
