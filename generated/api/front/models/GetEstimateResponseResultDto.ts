/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EstimateDto } from './EstimateDto';
import type { GetSellerInfoResultUserDto } from './GetSellerInfoResultUserDto';
import type { ProductDto } from './ProductDto';
import type { ProductEstimateResultDto } from './ProductEstimateResultDto';
import type { ReplyType } from './ReplyType';
import type { SellerInfoDto } from './SellerInfoDto';

export type GetEstimateResponseResultDto = {
  replyType: ReplyType;
  id: number;
  createdAt: string;
  estimate: EstimateDto;
  sellerInfo: SellerInfoDto;
  buyer: GetSellerInfoResultUserDto;
  seller: GetSellerInfoResultUserDto;
  product: ProductDto;
  productEstimateResponses?: Array<ProductEstimateResultDto>;
};
