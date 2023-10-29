/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWikiCategoryDto } from '../models/CreateWikiCategoryDto';
import type { PaginatedWikiCategoryEntityListDto } from '../models/PaginatedWikiCategoryEntityListDto';
import type { UpdateWikiCategoryDto } from '../models/UpdateWikiCategoryDto';
import type { WikiCategoryDto } from '../models/WikiCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikiCategoryEntitiesService {
  /**
   * 위키 카테고리 생성
   * @param requestBody
   * @returns WikiCategoryDto
   * @throws ApiError
   */
  public static createWikiCategory(
    requestBody: CreateWikiCategoryDto
  ): CancelablePromise<WikiCategoryDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/wiki-category-entities',
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
   * @returns PaginatedWikiCategoryEntityListDto
   * @throws ApiError
   */
  public static findAllWikiCategoryEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedWikiCategoryEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-category-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 위키 카테고리 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteWikiCategory(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/wiki-category-entities/{id}',
      path: {
        id: id,
      },
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
   * @returns WikiCategoryDto
   * @throws ApiError
   */
  public static findOneWikiCategoryEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<WikiCategoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-category-entities/{id}',
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
   * @returns WikiCategoryDto
   * @throws ApiError
   */
  public static updateWikiCategoryEntity(
    id: number,
    requestBody: UpdateWikiCategoryDto
  ): CancelablePromise<WikiCategoryDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/wiki-category-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
