/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminWikiDetailDto } from '../models/AdminWikiDetailDto';
import type { AdminWikiDto } from '../models/AdminWikiDto';
import type { PaginatedWikiEntityListDto } from '../models/PaginatedWikiEntityListDto';
import type { UpdateWikiDto } from '../models/UpdateWikiDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikisService {
  /**
   * 어드민 위키 단일 조회
   * @param id
   * @returns AdminWikiDetailDto
   * @throws ApiError
   */
  public static getAdminWikiDetail(
    id: number
  ): CancelablePromise<AdminWikiDetailDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-entities/wiki/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 어드민 위키 수정
   * UpdateWikiParagraphDto에 들어간 위키-문단 순서대로 wikiIndex 재지정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateAdminWiki(
    id: number,
    requestBody: UpdateWikiDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/wiki-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 어드민 위키 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteAdminWiki(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/wiki-entities/{id}',
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
   * @returns AdminWikiDto
   * @throws ApiError
   */
  public static findOneWikiEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<AdminWikiDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
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
   * @returns PaginatedWikiEntityListDto
   * @throws ApiError
   */
  public static findAllWikiEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedWikiEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
