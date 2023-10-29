/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetSellerInfoResultUserDto } from './GetSellerInfoResultUserDto';
import type { ProductEstimateResultDto } from './ProductEstimateResultDto';
import type { ReplyType } from './ReplyType';
import type { SearchProductResultDto } from './SearchProductResultDto';
import type { SellerInfoDto } from './SellerInfoDto';

export type GetProductEstimateDetailResultDto = {
  replyType: ReplyType;
  id: number;
  createdAt: string;
  product: SearchProductResultDto;
  buyer: GetSellerInfoResultUserDto;
  seller: GetSellerInfoResultUserDto;
  productEstimateResponses: Array<ProductEstimateResultDto>;
  sellerInfo: SellerInfoDto;
};
