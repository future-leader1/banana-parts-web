/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminProductEstimateSearchType } from '../models/AdminProductEstimateSearchType';
import type { DeleteProductEstimateDto } from '../models/DeleteProductEstimateDto';
import type { GetProductEstimateResultDto } from '../models/GetProductEstimateResultDto';
import type { PaginatedGetProductEstimateResultDtoListDto } from '../models/PaginatedGetProductEstimateResultDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductEstimateEntitiesService {
  /**
   * 어드민 견적 조회
   * @param searchType
   * @param searchKeyword
   * @param startDate
   * @param endDate
   * @param replyTypes
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetProductEstimateResultDtoListDto
   * @throws ApiError
   */
  public static getProductEstimatesAdmin(
    searchType?: AdminProductEstimateSearchType,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    replyTypes?: Array<string>,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetProductEstimateResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimate-entities',
      query: {
        searchType: searchType,
        searchKeyword: searchKeyword,
        startDate: startDate,
        endDate: endDate,
        replyTypes: replyTypes,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 어드민 견적 선택 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteProductEstimatesAdmin(
    requestBody: DeleteProductEstimateDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/product-estimate-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 어드민 견적 단일 조회
   * @param id
   * @returns GetProductEstimateResultDto
   * @throws ApiError
   */
  public static getProductEstimatedAdmin(
    id: number
  ): CancelablePromise<GetProductEstimateResultDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-estimate-entities/{id}',
      path: {
        id: id,
      },
    });
  }
}
