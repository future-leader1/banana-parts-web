/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuyerDto } from './BuyerDto';
import type { EstimateDto } from './EstimateDto';
import type { ProductEstimateResultDto } from './ProductEstimateResultDto';
import type { ProductResultDto } from './ProductResultDto';
import type { ReplyType } from './ReplyType';
import type { SellerDto } from './SellerDto';
import type { SellerInfoDto } from './SellerInfoDto';

export type GetProductEstimateResultDto = {
  replyType: ReplyType;
  id: number;
  createdAt: string;
  estimate: EstimateDto;
  product: ProductResultDto;
  buyer: BuyerDto;
  seller: SellerDto;
  sellerInfo: SellerInfoDto;
  productEstimateResponses?: Array<ProductEstimateResultDto>;
};
