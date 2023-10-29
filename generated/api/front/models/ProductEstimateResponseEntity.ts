/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEntity } from './ProductEntity';
import type { ProductEstimateEntity } from './ProductEstimateEntity';

export type ProductEstimateResponseEntity = {
  unitPrice?: number;
  currency?: ProductEstimateResponseEntity.currency;
  quantity?: number;
  krwTotalPrice?: number;
  krwGrandPrice?: number;
  krwVat?: number;
  krwTodayUnitPrice?: number;
  usdTotalPrice?: number;
  usdGrandPrice?: number;
  usdVat?: number;
  usdTodayUnitPrice?: number;
  cnyTotalPrice?: number;
  cnyGrandPrice?: number;
  cnyVat?: number;
  cnyTodayUnitPrice?: number;
  dueDate?: string;
  memo?: string;
  rejectedTitle?: string;
  rejectedDescription?: string;
  replyType: ProductEstimateResponseEntity.replyType;
  note?: string;
  productEstimateId: number;
  productId: number;
  productEstimate: ProductEstimateEntity;
  product: ProductEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace ProductEstimateResponseEntity {
  export enum currency {
    USD = 'USD',
    KRW = 'KRW',
    CNY = 'CNY',
  }

  export enum replyType {
    PENDING = 'PENDING',
    REPLIED = 'REPLIED',
    REJECTED = 'REJECTED',
  }
}
