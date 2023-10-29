/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRegisterRequestDto } from '../models/CreateRegisterRequestDto';
import type { PaginatedRegisterRequestHistoryEntityListDto } from '../models/PaginatedRegisterRequestHistoryEntityListDto';
import type { RegisterRequestHistoryDto } from '../models/RegisterRequestHistoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegisterRequestHistoryEntitiesService {
  /**
   * 어드민 대량 상품 등록 요청 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createAdminRegisterRequestHistory(
    requestBody: CreateRegisterRequestDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/register-request-history-entities',
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
   * @returns PaginatedRegisterRequestHistoryEntityListDto
   * @throws ApiError
   */
  public static findAllRegisterRequestHistoryEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedRegisterRequestHistoryEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/register-request-history-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
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
   * @returns RegisterRequestHistoryDto
   * @throws ApiError
   */
  public static findOneRegisterRequestHistoryEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<RegisterRequestHistoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/register-request-history-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
