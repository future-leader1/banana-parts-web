/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUserPenaltyHistoryEntityListDto } from '../models/PaginatedUserPenaltyHistoryEntityListDto';
import type { UpdateUserPenaltyHistoryDto } from '../models/UpdateUserPenaltyHistoryDto';
import type { UserPenaltyHistoryDto } from '../models/UserPenaltyHistoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserPenaltyHistoryEntitiesService {
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
   * @returns PaginatedUserPenaltyHistoryEntityListDto
   * @throws ApiError
   */
  public static findAllUserPenaltyHistoryEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedUserPenaltyHistoryEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-penalty-history-entities',
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
   * @returns UserPenaltyHistoryDto
   * @throws ApiError
   */
  public static findOneUserPenaltyHistoryEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<UserPenaltyHistoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-penalty-history-entities/{id}',
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
   * @returns UserPenaltyHistoryDto
   * @throws ApiError
   */
  public static updateUserPenaltyHistoryEntity(
    id: number,
    requestBody: UpdateUserPenaltyHistoryDto
  ): CancelablePromise<UserPenaltyHistoryDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/user-penalty-history-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
