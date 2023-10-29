/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminNewsDetailDto } from '../models/AdminNewsDetailDto';
import type { CreateNewsDto } from '../models/CreateNewsDto';
import type { PaginatedAdminNewsDtoListDto } from '../models/PaginatedAdminNewsDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsEntitiesService {
  /**
   * 뉴스 목록 조회
   * @param searchKeyword 검색 키워드
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAdminNewsDtoListDto
   * @throws ApiError
   */
  public static newsControllerGetNewsList(
    searchKeyword?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedAdminNewsDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news',
      query: {
        searchKeyword: searchKeyword,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 뉴스 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static newsControllerCreateNews(
    requestBody: CreateNewsDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/news',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 뉴스 상세 조회
   * @param id
   * @returns AdminNewsDetailDto
   * @throws ApiError
   */
  public static newsControllerGetNews(
    id: number
  ): CancelablePromise<AdminNewsDetailDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 뉴스 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static newsControllerUpdateNews(
    id: number,
    requestBody: CreateNewsDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/news/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 뉴스 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static newsControllerDeleteNews(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/news/{id}',
      path: {
        id: id,
      },
    });
  }
}
