/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryTagDto } from '../models/CategoryTagDto';
import type { CreateCategoryTagDto } from '../models/CreateCategoryTagDto';
import type { DeleteCategoryTagDto } from '../models/DeleteCategoryTagDto';
import type { PaginatedCategoryTagEntityListDto } from '../models/PaginatedCategoryTagEntityListDto';
import type { UpdateCategoryTagDto } from '../models/UpdateCategoryTagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryTagEntitiesService {
  /**
   * 태그 대량 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static categoryTagControllerDeleteCategoryTag(
    requestBody: DeleteCategoryTagDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/category-tag-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 페이지네이션 전체 목록 조회
   * /items
   * /items?page=1&limit=25
   * /items?filter={"name": "john"}
   * /items?filter={"email": {"ilike": "gmail"}}
   * /items?filter={"date": {"between": ["2022-05-01T15:00:00Z", "2022-05-02T15:00:00Z"]}}
   * /items?filter={"id": {"in": [1,2,3]}}
   * /items?filter={"relationItem.id": 1}
   * /items?filter={"relationItem.name": {"ilike": "john"}}
   * /items?sort={"id": "DESC"}
   * @param sort
   * @param filter
   * @param page
   * @param itemsPerPage
   * @returns PaginatedCategoryTagEntityListDto
   * @throws ApiError
   */
  public static findAllCategoryTagEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedCategoryTagEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/category-tag-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 단일생성
   * POST /items
   * @param requestBody
   * @returns CategoryTagDto
   * @throws ApiError
   */
  public static createCategoryTagEntity(
    requestBody: CreateCategoryTagDto
  ): CancelablePromise<CategoryTagDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/category-tag-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * ID로 단일 조회
   * /items/1
   * /items/1?filter={"name": "john"}
   * /items/1?filter={"email": {"ilike": "gmail"}}
   * /items/1?filter={"date": {"between": ["2022-05-01T15:00:00Z", "2022-05-02T15:00:00Z"]}}
   * /items/1?filter={"id": {"in": [1,2,3]}}
   * /items/1?filter={"relationItem.id": 1}
   * /items/1?filter={"relationItem.name": {"ilike": "john"}}
   * @param id
   * @param filter
   * @returns CategoryTagDto
   * @throws ApiError
   */
  public static findOneCategoryTagEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<CategoryTagDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/category-tag-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }

  /**
   * 단일수정
   * PATCH /items/1
   * @param id
   * @param requestBody
   * @returns CategoryTagDto
   * @throws ApiError
   */
  public static updateCategoryTagEntity(
    id: number,
    requestBody: UpdateCategoryTagDto
  ): CancelablePromise<CategoryTagDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/category-tag-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
