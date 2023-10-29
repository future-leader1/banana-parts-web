/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WikiCategoryDto } from '../models/WikiCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikiCategoriesService {
  /**
   * 위키 카테고리 조회
   * @returns WikiCategoryDto
   * @throws ApiError
   */
  public static findAllWikiCategories(): CancelablePromise<
    Array<WikiCategoryDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-categories',
    });
  }
}
