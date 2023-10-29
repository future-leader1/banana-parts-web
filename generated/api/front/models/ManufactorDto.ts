/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductDto } from './ProductDto';

export type ManufactorDto = {
  id: number;
  createdAt: string;
  companyName: string;
  logoUrl?: string;
  parentId?: number;
  products: Array<ProductDto>;
};
