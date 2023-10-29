/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductBookmarkResultDto } from './ProductBookmarkResultDto';
import type { ProductCategoryDto } from './ProductCategoryDto';

export type ProductDetailResultDto = {
  id: number;
  createdAt: string;
  name: string;
  minKrwPrice?: number;
  maxKrwPrice?: number;
  minCnyPrice?: number;
  maxCnyPrice?: number;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  manufactorName: string;
  bookmarks?: Array<ProductBookmarkResultDto>;
  productCategoryTags?: Array<ProductCategoryDto>;
};
