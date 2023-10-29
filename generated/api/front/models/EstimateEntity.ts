/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEstimateEntity } from './ProductEstimateEntity';

export type EstimateEntity = {
  quantity: number;
  hopePrice?: number;
  currency: EstimateEntity.currency;
  memo: string;
  totalRequestCount: number;
  repliedCount: number;
  productEstimates: Array<ProductEstimateEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace EstimateEntity {
  export enum currency {
    USD = 'USD',
    KRW = 'KRW',
    CNY = 'CNY',
  }
}
