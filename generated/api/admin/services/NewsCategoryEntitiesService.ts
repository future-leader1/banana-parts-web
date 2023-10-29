/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChildNewsCategoryDto } from '../models/ChildNewsCategoryDto';
import type { CreateNewsCategoryDto } from '../models/CreateNewsCategoryDto';
import type { NewsCategoryDto } from '../models/NewsCategoryDto';
import type { UpdateNewsCategoryDto } from '../models/UpdateNewsCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsCategoryEntitiesService {
  /**
   * 뉴스 카테고리 목록 조회
   * @returns NewsCategoryDto
   * @throws ApiError
   */
  public static newsCategoryControllerGetNewsCategories(): CancelablePromise<
    Array<NewsCategoryDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news-categories',
    });
  }

  /**
   * 뉴스 카테고리 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static newsCategoryControllerCreateNewsCategory(
    requestBody: CreateNewsCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/news-categories',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 뉴스 상위 카테고리 목록 조회
   * @returns ChildNewsCategoryDto
   * @throws ApiError
   */
  public static newsCategoryControllerGetOneDepthsNewsCategories(): CancelablePromise<
    Array<ChildNewsCategoryDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news-categories/one-depths',
    });
  }

  /**
   * 뉴스 카테고리 단일 조회
   * @param id
   * @returns ChildNewsCategoryDto
   * @throws ApiError
   */
  public static newsCategoryControllerGetNewsCategory(
    id: number
  ): CancelablePromise<ChildNewsCategoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news-categories/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 뉴스 카테고리 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static newsCategoryControllerUpdateNewsCategory(
    id: number,
    requestBody: UpdateNewsCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/news-categories/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 뉴스 카테고리 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static newsCategoryControllerDeleteNewsCategory(
    id: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/news-categories/{id}',
      path: {
        id: id,
      },
    });
  }
}
