/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentCurrency } from './PaymentCurrency';

export type RequestEstimateDto = {
  currency: PaymentCurrency;
  sellerIds: Array<number>;
  quantity: number;
  productId: number;
  hopePrice?: number;
  memo: string;
};
