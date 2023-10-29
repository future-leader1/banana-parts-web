/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUpdateWriterInfoDto } from '../models/AdminUpdateWriterInfoDto';
import type { WriterInfoDto } from '../models/WriterInfoDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WriterInfosService {
  /**
   * 작성자 정보 조회
   * @param userId
   * @returns WriterInfoDto
   * @throws ApiError
   */
  public static getWriterInfo(
    userId: number
  ): CancelablePromise<WriterInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/writer-infos',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 작성자 정보 수정
   * role에 NONE 입력시 Rejected 처리/ WRITER, EXPERT 입력시 Approved 처리
   * @param id
   * @param requestBody
   * @returns WriterInfoDto
   * @throws ApiError
   */
  public static updateWriterInfo(
    id: number,
    requestBody: AdminUpdateWriterInfoDto
  ): CancelablePromise<WriterInfoDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/writer-infos/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
