/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetSellerInfoResultDto } from '../models/GetSellerInfoResultDto';
import type { PaginatedSellerInfoEntityListDto } from '../models/PaginatedSellerInfoEntityListDto';
import type { PatchSellerInfoDto } from '../models/PatchSellerInfoDto';
import type { SellerInfoDto } from '../models/SellerInfoDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SellerInfoEntitiesService {
  /**
   * 판매자 정보 상세 조회
   * @param userId
   * @returns GetSellerInfoResultDto
   * @throws ApiError
   */
  public static getSellerInfoAdmin(
    userId: number
  ): CancelablePromise<GetSellerInfoResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-info',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 판매자 정보 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static patchSellerInfoAdmin(
    id: number,
    requestBody: PatchSellerInfoDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/seller-info/{id}',
      path: {
        id: id,
      },
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
   * @returns PaginatedSellerInfoEntityListDto
   * @throws ApiError
   */
  public static findAllSellerInfoEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedSellerInfoEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-info-entities',
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
   * @returns SellerInfoDto
   * @throws ApiError
   */
  public static findOneSellerInfoEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<SellerInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-info-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
