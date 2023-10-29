/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductEstimateResponseDto } from '../models/CreateProductEstimateResponseDto';
import type { RejectProductEstimateResponseDto } from '../models/RejectProductEstimateResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductEstimateResponseService {
  /**
   * 상품견적 회신 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createEstimateResponse(
    requestBody: CreateProductEstimateResponseDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/product-estimate-responses',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 상품견적 거절
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createRejectResponse(
    requestBody: RejectProductEstimateResponseDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/product-estimate-responses/reject',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
