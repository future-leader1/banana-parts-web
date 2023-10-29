/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentCurrency } from './PaymentCurrency';

export type EstimateDto = {
  currency: PaymentCurrency;
  id: number;
  createdAt: string;
  quantity: number;
  hopePrice?: number;
  memo: string;
  totalRequestCount: number;
  repliedCount: number;
};
