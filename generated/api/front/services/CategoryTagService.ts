/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryTagListDto } from '../models/CategoryTagListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryTagService {
  /**
   * 카테고리 전체 조회
   * @returns CategoryTagListDto
   * @throws ApiError
   */
  public static getCategories(): CancelablePromise<CategoryTagListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/category-tags',
    });
  }
}
