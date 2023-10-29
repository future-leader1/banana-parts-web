/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedManufactorListDto } from '../models/PaginatedManufactorListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ManufactorService {
  /**
   * 제조사 목록 가져오기 (페이지네이션)
   * @param sort
   * @param filter
   * @param searchKeyword
   * @param haveMerchandise
   * @param page
   * @param itemsPerPage
   * @returns PaginatedManufactorListDto
   * @throws ApiError
   */
  public static getAllManufactorsWithPagination(
    sort?: string,
    filter?: string,
    searchKeyword?: string,
    haveMerchandise?: boolean,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedManufactorListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/manufactors',
      query: {
        sort: sort,
        filter: filter,
        searchKeyword: searchKeyword,
        haveMerchandise: haveMerchandise,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 전체 상품 개수 조회
   * @returns number
   * @throws ApiError
   */
  public static getManufactorCounts(): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/manufactors/count',
    });
  }
}
