/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EstimateEntity } from './EstimateEntity';
import type { ProductEntity } from './ProductEntity';
import type { ProductEstimateResponseEntity } from './ProductEstimateResponseEntity';
import type { SellerInfoEntity } from './SellerInfoEntity';
import type { UserEntity } from './UserEntity';

export type ProductEstimateEntity = {
  replyType: ProductEstimateEntity.replyType;
  estimateId: number;
  buyerId: number;
  sellerId: number;
  productId: number;
  sellerInfoId: number;
  estimate: EstimateEntity;
  buyer: UserEntity;
  seller: UserEntity;
  product: ProductEntity;
  sellerInfo: SellerInfoEntity;
  productEstimateResponses: Array<ProductEstimateResponseEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace ProductEstimateEntity {
  export enum replyType {
    PENDING = 'PENDING',
    REPLIED = 'REPLIED',
    REJECTED = 'REJECTED',
  }
}
