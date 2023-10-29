/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReplyEntitiesService {
  /**
   * 댓글  삭제
   * @param replyId
   * @returns any
   * @throws ApiError
   */
  public static deleteReplyAdmin(replyId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/reply/{replyId}',
      path: {
        replyId: replyId,
      },
    });
  }
}
