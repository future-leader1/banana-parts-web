/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewsClickHistoryDto } from '../models/CreateNewsClickHistoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsClickHistoryService {
  /**
   * 뉴스 클릭 히스토리 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static newsClickHistoryControllerCreateNewsClickHistory(
    requestBody: CreateNewsClickHistoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/news-click-histories',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
