/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReplyDto } from '../models/CreateReplyDto';
import type { ReplyEntity } from '../models/ReplyEntity';
import type { UpdateReplyDto } from '../models/UpdateReplyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReplyService {
  /**
   * 댓글, 대댓글 생성
   * @param boardId
   * @param requestBody
   * @returns ReplyEntity
   * @throws ApiError
   */
  public static createReply(
    boardId: number,
    requestBody: CreateReplyDto
  ): CancelablePromise<ReplyEntity> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/board/{boardId}/reply',
      path: {
        boardId: boardId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 댓글, 대댓글 수정
   * @param replyId
   * @param requestBody
   * @returns ReplyEntity
   * @throws ApiError
   */
  public static updateReply(
    replyId: number,
    requestBody: UpdateReplyDto
  ): CancelablePromise<ReplyEntity> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/reply/{replyId}',
      path: {
        replyId: replyId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 댓글, 대댓글 삭제
   * @param replyId
   * @returns any
   * @throws ApiError
   */
  public static deleteReply(replyId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/reply/{replyId}',
      path: {
        replyId: replyId,
      },
    });
  }
}
