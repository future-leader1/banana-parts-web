/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetProductEstimateResultDto } from './GetProductEstimateResultDto';

export type GetEstimateResultDto = {
  id: number;
  createdAt: string;
  productEstimates: Array<GetProductEstimateResultDto>;
};
