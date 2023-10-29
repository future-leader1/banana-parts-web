/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetEstimateResponseResultDto } from '../models/GetEstimateResponseResultDto';
import type { GetProductEstimateDashboardDto } from '../models/GetProductEstimateDashboardDto';
import type { PaginatedGetProductEstimateDetailResultDtoListDto } from '../models/PaginatedGetProductEstimateDetailResultDtoListDto';
import type { PaginatedGetSellerProductEstimateResultDtoListDto } from '../models/PaginatedGetSellerProductEstimateResultDtoListDto';
import type { ReplyType } from '../models/ReplyType';
import type { SellerSearchType } from '../models/SellerSearchType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductEstimateService {
  /**
   * 상품 견적서 리스트 조회
   * @param estimateId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetProductEstimateDetailResultDtoListDto
   * @throws ApiError
   */
  public static getProductEstimateDetail(
    estimateId: number,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetProductEstimateDetailResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimates/estimate',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        estimateId: estimateId,
      },
    });
  }

  /**
   * 판매자 관리 상품견적서 리스트 조회
   * @param replyType
   * @param searchType
   * @param searchKeyword
   * @param startDate
   * @param endDate
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetSellerProductEstimateResultDtoListDto
   * @throws ApiError
   */
  public static getSellerProductEstimate(
    replyType?: ReplyType,
    searchType?: SellerSearchType,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetSellerProductEstimateResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimates/seller-estimate',
      query: {
        replyType: replyType,
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
   * 판매자 관리 상품견적서 현황 조회
   * @returns GetProductEstimateDashboardDto
   * @throws ApiError
   */
  public static getSellerProductEstimateCount(): CancelablePromise<GetProductEstimateDashboardDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimates/dashboard',
    });
  }

  /**
   * 견적서 상세 조회
   * @param id
   * @returns GetEstimateResponseResultDto
   * @throws ApiError
   */
  public static getProductEstimate(
    id: number
  ): CancelablePromise<GetEstimateResponseResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimates/{id}',
      path: {
        id: id,
      },
    });
  }
}
