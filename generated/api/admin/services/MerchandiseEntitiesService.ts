/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminMerchandiseSearchType } from '../models/AdminMerchandiseSearchType';
import type { DeleteMerchandiseDto } from '../models/DeleteMerchandiseDto';
import type { MerchandiseDto } from '../models/MerchandiseDto';
import type { PaginatedGetAdminMerchandiseResultDtoListDto } from '../models/PaginatedGetAdminMerchandiseResultDtoListDto';
import type { PaginatedMerchandiseEntityListDto } from '../models/PaginatedMerchandiseEntityListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MerchandiseEntitiesService {
  /**
   * 어드민 판매 상품 조회
   * @param searchType
   * @param searchKeyword
   * @param startDate
   * @param endDate
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetAdminMerchandiseResultDtoListDto
   * @throws ApiError
   */
  public static getMerchandisesAdmin(
    searchType?: AdminMerchandiseSearchType,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetAdminMerchandiseResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/merchandise-entities/get-admin',
      query: {
        searchType: searchType,
        searchKeyword: searchKeyword,
        startDate: startDate,
        endDate: endDate,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 어드민 판매 상품 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteMerchandisesAdmin(
    requestBody: DeleteMerchandiseDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/merchandise-entities',
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
   * @returns PaginatedMerchandiseEntityListDto
   * @throws ApiError
   */
  public static findAllMerchandiseEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedMerchandiseEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/merchandise-entities',
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
   * @returns MerchandiseDto
   * @throws ApiError
   */
  public static findOneMerchandiseEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<MerchandiseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/merchandise-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
