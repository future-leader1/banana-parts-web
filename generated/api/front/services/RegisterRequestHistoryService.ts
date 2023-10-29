/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRegisterRequestDto } from '../models/CreateRegisterRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegisterRequestHistoryService {
  /**
   * 대량 판매 등록 요청 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createRegisterRequestHistory(
    requestBody: CreateRegisterRequestDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/register-request-histories',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
