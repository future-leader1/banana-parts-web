/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResultDto } from '../models/LoginResultDto';
import type { LoginWithUserIdDto } from '../models/LoginWithUserIdDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * @returns any The Health Check is successful
   * @throws ApiError
   */
  public static healthControllerCheck(): CancelablePromise<{
    status?: string;
    info?: Record<string, Record<string, string>> | null;
    error?: Record<string, Record<string, string>> | null;
    details?: Record<string, Record<string, string>>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/health',
      errors: {
        503: `The Health Check is not successful`,
      },
    });
  }

  /**
   * 관리자 이메일 로그인
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static authControllerLoginByUserId(
    requestBody: LoginWithUserIdDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
