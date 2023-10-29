/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMerchandisesDto } from '../models/CreateMerchandisesDto';
import type { DeleteMerchandisesDto } from '../models/DeleteMerchandisesDto';
import type { PaginatedGetSellerProductResultDtoListDto } from '../models/PaginatedGetSellerProductResultDtoListDto';
import type { PaginatedMerchandiseDtoListDto } from '../models/PaginatedMerchandiseDtoListDto';
import type { SearchType } from '../models/SearchType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MerchandiseService {
  /**
   * 판매자 판매상품 조회
   * @param userId
   * @param page
   * @param itemsPerPage
   * @param searchKeyword
   * @returns PaginatedMerchandiseDtoListDto
   * @throws ApiError
   */
  public static getMerchandises(
    userId: number,
    page: number = 1,
    itemsPerPage: number = 30,
    searchKeyword?: string
  ): CancelablePromise<PaginatedMerchandiseDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/merchandises',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        userId: userId,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 판매자 판매 상품 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createMerchandises(
    requestBody: CreateMerchandisesDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/merchandises',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 판매자 판매상품 선택 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteSellerMerchandises(
    requestBody: DeleteMerchandisesDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/merchandises',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 판매자 판매관리 제품 조회
   * @param searchType
   * @param searchKeyword
   * @param startDate
   * @param endDate
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetSellerProductResultDtoListDto
   * @throws ApiError
   */
  public static getSellerMerchandises(
    searchType?: SearchType,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetSellerProductResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/merchandises/seller',
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
   * 판매자 판매상품 단일 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteSellerMerchandise(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/merchandises/{id}',
      path: {
        id: id,
      },
    });
  }
}
