/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EstimateDto } from './EstimateDto';
import type { GetBuyerDto } from './GetBuyerDto';
import type { ReplyType } from './ReplyType';
import type { SearchProductResultDto } from './SearchProductResultDto';

export type GetSellerProductEstimateResultDto = {
  replyType: ReplyType;
  id: number;
  createdAt: string;
  estimate: EstimateDto;
  product: SearchProductResultDto;
  buyer: GetBuyerDto;
};
