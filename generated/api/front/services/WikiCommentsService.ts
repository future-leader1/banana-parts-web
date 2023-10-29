/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWikiCommentDto } from '../models/CreateWikiCommentDto';
import type { PaginatedWikiCommentDetailDtoListDto } from '../models/PaginatedWikiCommentDetailDtoListDto';
import type { UpdateWikiCommentDto } from '../models/UpdateWikiCommentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikiCommentsService {
  /**
   * 위키 댓글 목록 조회
   * @param wikiId 위키 ID
   * @param page
   * @param itemsPerPage
   * @returns PaginatedWikiCommentDetailDtoListDto
   * @throws ApiError
   */
  public static getWikiComments(
    wikiId: number,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedWikiCommentDetailDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wiki_comments',
      query: {
        wikiId: wikiId,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 위키 댓글 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createCommentWiki(
    requestBody: CreateWikiCommentDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/wiki_comments',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 위키 댓글 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateCommentWiki(
    id: number,
    requestBody: UpdateWikiCommentDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/wiki_comments/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 위키 댓글 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteCommentWiki(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/wiki_comments/{id}',
      path: {
        id: id,
      },
    });
  }
}
