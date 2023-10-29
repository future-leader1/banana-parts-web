/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentCurrency } from './PaymentCurrency';
import type { ReplyType } from './ReplyType';

export type ProductEstimateResultDto = {
  currency?: PaymentCurrency;
  replyType: ReplyType;
  id: number;
  createdAt: string;
  quantity?: number;
  dueDate?: string;
  memo?: string;
  rejectedTitle?: string;
  rejectedDescription?: string;
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
  unitPrice?: number;
  note?: string;
};
