/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoardDto } from '../models/BoardDto';
import type { BoardSearchType } from '../models/BoardSearchType';
import type { BoardType } from '../models/BoardType';
import type { DeleteBoardDto } from '../models/DeleteBoardDto';
import type { PaginatedBoardDtoListDto } from '../models/PaginatedBoardDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BoardEntitiesService {
  /**
   * 게시글 필터 조회 및 검색
   * @param status 필터
   * @param searchType 검색 타입
   * @param searchData 검색어
   * @param page
   * @param itemsPerPage
   * @returns PaginatedBoardDtoListDto
   * @throws ApiError
   */
  public static getBoardsAdmin(
    status?: BoardType,
    searchType?: BoardSearchType,
    searchData?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedBoardDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/boards',
      query: {
        status: status,
        searchType: searchType,
        searchData: searchData,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 게시글들  삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteBoardsAdmin(
    requestBody: DeleteBoardDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/boards',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 게시글 상세 조회
   * @param id
   * @returns BoardDto
   * @throws ApiError
   */
  public static getBoardByBoardIdAdmin(
    id: number
  ): CancelablePromise<BoardDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/boards/{id}',
      path: {
        id: id,
      },
    });
  }
}
