/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWikiRequestHistoryDto } from '../models/CreateWikiRequestHistoryDto';
import type { MyWikiRequestHistoryDto } from '../models/MyWikiRequestHistoryDto';
import type { PaginatedMyWikiRequestHistoryDtoListDto } from '../models/PaginatedMyWikiRequestHistoryDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikiRequestHistoriesService {
  /**
   * 내가 받은 위키 의견 목록 조회
   * @param page
   * @param itemsPerPage
   * @param isViewed 읽음 여부 필터링
   * @returns PaginatedMyWikiRequestHistoryDtoListDto
   * @throws ApiError
   */
  public static getMyWikiRequestHistoryList(
    page: number = 1,
    itemsPerPage: number = 30,
    isViewed?: boolean
  ): CancelablePromise<PaginatedMyWikiRequestHistoryDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki_request_histories',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        isViewed: isViewed,
      },
    });
  }

  /**
   * 위키 의견 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createWikiRequestHistory(
    requestBody: CreateWikiRequestHistoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/wiki_request_histories',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 위키 의견 단일 조회
   * @param id
   * @returns MyWikiRequestHistoryDto
   * @throws ApiError
   */
  public static getWikiRequestHistoryById(
    id: number
  ): CancelablePromise<MyWikiRequestHistoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki_request_histories/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 위키 의견 읽음 처리
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static updateWikiRequestHistoryIsViewed(
    id: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/wiki_request_histories/{id}/is-viewed',
      path: {
        id: id,
      },
    });
  }
}
