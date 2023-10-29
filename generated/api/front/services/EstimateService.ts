/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstimateDto } from '../models/EstimateDto';
import type { PaginatedGetEstimateResultDtoListDto } from '../models/PaginatedGetEstimateResultDtoListDto';
import type { RequestEstimateDto } from '../models/RequestEstimateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EstimateService {
  /**
   * 내 견적 리스트 조회
   * @param page
   * @param itemsPerPage
   * @param searchKeyword
   * @returns PaginatedGetEstimateResultDtoListDto
   * @throws ApiError
   */
  public static getMyEstimates(
    page: number = 1,
    itemsPerPage: number = 30,
    searchKeyword?: string
  ): CancelablePromise<PaginatedGetEstimateResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/estimates',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 견적 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createEstimate(
    requestBody: RequestEstimateDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/estimates',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 견적 조회
   * @param id
   * @returns EstimateDto
   * @throws ApiError
   */
  public static getEstimateDetail(id: number): CancelablePromise<EstimateDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/estimates/{id}',
      path: {
        id: id,
      },
    });
  }
}
