/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetTemplateResultDto } from '../models/GetTemplateResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegisterRequestTemplateService {
  /**
   * 대량 등록 신청 템플릿 S3 url 조회
   * @returns GetTemplateResultDto
   * @throws ApiError
   */
  public static getRecentTemplate(): CancelablePromise<GetTemplateResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/register-request-templates',
    });
  }

  /**
   * 대량등록요청템플릿 재생성 (개발용 API)
   * @returns any
   * @throws ApiError
   */
  public static createTemplateForDev(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/register-request-templates',
    });
  }
}
