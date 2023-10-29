/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailVerificationResultDto } from '../models/EmailVerificationResultDto';
import type { RequestEmailVerificationDto } from '../models/RequestEmailVerificationDto';
import type { ValidEmailVerificationDto } from '../models/ValidEmailVerificationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmailVerificationService {
  /**
   * 이메일 인증 요청
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static requestEmailVerification(
    requestBody: RequestEmailVerificationDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/email-verification',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 이메일 인증 체크
   * @param requestBody
   * @returns EmailVerificationResultDto
   * @throws ApiError
   */
  public static verifyEmail(
    requestBody: ValidEmailVerificationDto
  ): CancelablePromise<EmailVerificationResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/email-verification/verify',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
