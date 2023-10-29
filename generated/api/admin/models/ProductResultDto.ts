/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProductResultDto = {
  id: number;
  createdAt: string;
  name: string;
  minKrwPrice?: number;
  maxKrwPrice?: number;
  minCnyPrice?: number;
  maxCnyPrice?: number;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  manufactorName: string;
  sellerCount: number;
};
