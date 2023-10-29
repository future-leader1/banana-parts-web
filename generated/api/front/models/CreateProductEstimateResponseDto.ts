/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentCurrency } from './PaymentCurrency';

export type CreateProductEstimateResponseDto = {
  currency: PaymentCurrency;
  productEstimateId: number;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  dueDate: string;
  note?: string;
  memo?: string;
};
