/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductBookmarkResultDto } from './ProductBookmarkResultDto';

export type SearchProductResultDto = {
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
  sellerCount: number;
  bookmarks?: Array<ProductBookmarkResultDto>;
};
