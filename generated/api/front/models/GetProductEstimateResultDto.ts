/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReplyType } from './ReplyType';
import type { SearchProductResultDto } from './SearchProductResultDto';

export type GetProductEstimateResultDto = {
  replyType: ReplyType;
  id: number;
  createdAt: string;
  product: SearchProductResultDto;
};
