/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSellerInfoDto } from '../models/CreateSellerInfoDto';
import type { GetSellerInfoResultDto } from '../models/GetSellerInfoResultDto';
import type { PaginatedsearchSellerInfoListDto } from '../models/PaginatedsearchSellerInfoListDto';
import type { PaginatedSellerInfoListDto } from '../models/PaginatedSellerInfoListDto';
import type { SellerInfoDto } from '../models/SellerInfoDto';
import type { UpdateSellerInfoDto } from '../models/UpdateSellerInfoDto';
import type { UserSellerInfoDto } from '../models/UserSellerInfoDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SellerInfoService {
  /**
   * 판매자 정보 조회
   * @param userId
   * @returns GetSellerInfoResultDto
   * @throws ApiError
   */
  public static getSellerInfo(
    userId: number
  ): CancelablePromise<GetSellerInfoResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-infos',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 판매자 정보 신규 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createSellerInfo(
    requestBody: CreateSellerInfoDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/seller-infos',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 판매자 정보 수정 신청
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateSellerInfo(
    requestBody: UpdateSellerInfoDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/seller-infos',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 내 판매자 정보 조회
   * @returns SellerInfoDto
   * @throws ApiError
   */
  public static getMySellerInfo(): CancelablePromise<SellerInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-infos/me',
    });
  }

  /**
   * 부품 판매자 리스트 조회
   * @param productId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedSellerInfoListDto
   * @throws ApiError
   */
  public static getProductSellerInfo(
    productId: number,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedSellerInfoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-infos/product',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        productId: productId,
      },
    });
  }

  /**
   * 판매자 검색
   * @param page
   * @param itemsPerPage
   * @param searchKeyword
   * @returns PaginatedsearchSellerInfoListDto
   * @throws ApiError
   */
  public static searchSellerInfo(
    page: number = 1,
    itemsPerPage: number = 30,
    searchKeyword?: string
  ): CancelablePromise<PaginatedsearchSellerInfoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-infos/search',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 판매자 정보 상세 조회
   * @param id
   * @returns UserSellerInfoDto
   * @throws ApiError
   */
  public static getSellerInfoDetail(
    id: number
  ): CancelablePromise<UserSellerInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/seller-infos/{id}',
      path: {
        id: id,
      },
    });
  }
}
