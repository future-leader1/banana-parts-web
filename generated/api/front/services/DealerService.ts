/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DealerDto } from '../models/DealerDto';
import type { PaginatedDealerListDto } from '../models/PaginatedDealerListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DealerService {
  /**
   * 대리점 목록 가져오기 (페이지네이션)
   * @param manufactorId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedDealerListDto
   * @throws ApiError
   */
  public static getAllDealersWithPagination(
    manufactorId?: number,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedDealerListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/dealers',
      query: {
        manufactorId: manufactorId,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 대리점 상세 조회
   * @param id
   * @returns DealerDto
   * @throws ApiError
   */
  public static getDealerDetail(id: number): CancelablePromise<DealerDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/dealers/{id}',
      path: {
        id: id,
      },
    });
  }
}
