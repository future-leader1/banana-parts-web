/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserPenaltyHistoryDto } from '../models/CreateUserPenaltyHistoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserPenaltyHistoriesService {
  /**
   * 판매자 신고하기
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createUserPenaltyHistory(
    requestBody: CreateUserPenaltyHistoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user_penalty_histories',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
