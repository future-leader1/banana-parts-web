/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookMarkDto } from '../models/BookMarkDto';
import type { CreateBookmarkDto } from '../models/CreateBookmarkDto';
import type { DeleteBookmarkDto } from '../models/DeleteBookmarkDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookmarkService {
  /**
   * 즐겨찾기 추가
   * @param requestBody
   * @returns BookMarkDto
   * @throws ApiError
   */
  public static createBookmark(
    requestBody: CreateBookmarkDto
  ): CancelablePromise<BookMarkDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/bookmarks',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 즐겨찾기 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteBookmark(
    requestBody: DeleteBookmarkDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/bookmarks',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 내 즐겨찾기 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns any
   * @throws ApiError
   */
  public static getBookmarkedProducts(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/bookmarks/me',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
