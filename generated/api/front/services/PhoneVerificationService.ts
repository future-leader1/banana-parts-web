/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhoneVerificationResultDto } from '../models/PhoneVerificationResultDto';
import type { RequestPhoneVerificationDto } from '../models/RequestPhoneVerificationDto';
import type { ValidPhoneVerificationDto } from '../models/ValidPhoneVerificationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PhoneVerificationService {
  /**
   * 휴대폰 인증 요청
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static requestPhoneVerification(
    requestBody: RequestPhoneVerificationDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/phone-verification',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 휴대폰 인증 체크
   * @param requestBody
   * @returns PhoneVerificationResultDto
   * @throws ApiError
   */
  public static verifyPhone(
    requestBody: ValidPhoneVerificationDto
  ): CancelablePromise<PhoneVerificationResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/phone-verification/verify',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
