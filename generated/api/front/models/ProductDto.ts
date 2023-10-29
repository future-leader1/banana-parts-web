/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProductDto = {
  id: number;
  createdAt: string;
  name: string;
  minKrwPrice?: number;
  maxKrwPrice?: number;
  minCnyPrice?: number;
  maxCnyPrice?: number;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  searchName?: string;
  manufactorName: string;
  sellerCount: number;
};
