/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDealerDto } from '../models/CreateDealerDto';
import type { DealerDto } from '../models/DealerDto';
import type { DeleteDealerDto } from '../models/DeleteDealerDto';
import type { PaginatedDealerEntityListDto } from '../models/PaginatedDealerEntityListDto';
import type { UpdateDealerDto } from '../models/UpdateDealerDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DealerEntitiesService {
  /**
   * 어드민 대리점 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createDealerAdmin(
    requestBody: CreateDealerDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/dealer-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 어드민 대리점 선택 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteDealersAdmin(
    requestBody: DeleteDealerDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/dealer-entities',
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
   * @returns PaginatedDealerEntityListDto
   * @throws ApiError
   */
  public static findAllDealerEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedDealerEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/dealer-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 어드민 대리점 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateDealerAdmin(
    id: number,
    requestBody: UpdateDealerDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/dealer-entities/{id}',
      path: {
        id: id,
      },
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
   * @returns DealerDto
   * @throws ApiError
   */
  public static findOneDealerEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<DealerDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/dealer-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
