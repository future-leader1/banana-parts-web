/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsByCategoryDto } from '../models/NewsByCategoryDto';
import type { NewsDto } from '../models/NewsDto';
import type { PaginatedNewsDtoListDto } from '../models/PaginatedNewsDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsService {
  /**
   * 뉴스 최신순 조회
   * @param limit
   * @returns NewsDto
   * @throws ApiError
   */
  public static newsControllerGetLatestNews(
    limit: number = 10
  ): CancelablePromise<Array<NewsDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news/latest',
      query: {
        limit: limit,
      },
    });
  }

  /**
   * 뉴스 인기순 조회
   * @param limit
   * @returns NewsDto
   * @throws ApiError
   */
  public static newsControllerGetPopularNews(
    limit: number = 10
  ): CancelablePromise<Array<NewsDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news/popular',
      query: {
        limit: limit,
      },
    });
  }

  /**
   * 뉴스 카테고리별 조회
   * @returns NewsByCategoryDto
   * @throws ApiError
   */
  public static newsControllerGetNewsByCategory(): CancelablePromise<
    Array<NewsByCategoryDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news/categories',
    });
  }

  /**
   * 뉴스 검색
   * @param searchKeyword 검색 키워드
   * @param page
   * @param itemsPerPage
   * @returns PaginatedNewsDtoListDto
   * @throws ApiError
   */
  public static newsControllerSearchNews(
    searchKeyword: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedNewsDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/news/search',
      query: {
        searchKeyword: searchKeyword,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
