/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedProductIdsResultDtoListDto } from '../models/PaginatedProductIdsResultDtoListDto';
import type { PaginatedSearchProductResultDtoListDto } from '../models/PaginatedSearchProductResultDtoListDto';
import type { ProductDetailResultDto } from '../models/ProductDetailResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductService {
  /**
   * 제품 검색
   * @param page
   * @param itemsPerPage
   * @param manufactorId
   * @param searchKeyword
   * @returns PaginatedSearchProductResultDtoListDto
   * @throws ApiError
   */
  public static searchProduct(
    page: number = 1,
    itemsPerPage: number = 30,
    manufactorId?: number,
    searchKeyword?: string
  ): CancelablePromise<PaginatedSearchProductResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/search',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        manufactorId: manufactorId,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 전체상품 ID 페이지네이션 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedProductIdsResultDtoListDto
   * @throws ApiError
   */
  public static findAllProductIdsWithPagination(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedProductIdsResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/ids',
      query: {
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
  public static getProductCounts(): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/count',
    });
  }

  /**
   * 제품 조회
   * @param id
   * @returns ProductDetailResultDto
   * @throws ApiError
   */
  public static getProductDetail(
    id: number
  ): CancelablePromise<ProductDetailResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/{id}',
      path: {
        id: id,
      },
    });
  }
}
