/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookmarkEntity } from './BookmarkEntity';
import type { MerchandiseEntity } from './MerchandiseEntity';
import type { ProductCategoryTagEntity } from './ProductCategoryTagEntity';
import type { ProductEstimateEntity } from './ProductEstimateEntity';
import type { ProductEstimateResponseEntity } from './ProductEstimateResponseEntity';

export type ProductEntity = {
  name: string;
  minKrwPrice?: number;
  maxKrwPrice?: number;
  minCnyPrice?: number;
  maxCnyPrice?: number;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  searchName: string;
  isHidden: boolean;
  manufactorName: string;
  productNumber: string;
  sellerCount: number;
  manufactorId?: number;
  productCategoryTags: Array<ProductCategoryTagEntity>;
  merchandises: Array<MerchandiseEntity>;
  bookmarks: Array<BookmarkEntity>;
  productEstimates: Array<ProductEstimateEntity>;
  productEstimateResponses: Array<ProductEstimateResponseEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};
