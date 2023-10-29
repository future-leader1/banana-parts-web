/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWriterInfoDto } from '../models/CreateWriterInfoDto';
import type { UpdateWriterInfoDto } from '../models/UpdateWriterInfoDto';
import type { WriterInfoDto } from '../models/WriterInfoDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WriterInfosService {
  /**
   * 작성자 정보 신규 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createWriterInfo(
    requestBody: CreateWriterInfoDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/writer_infos',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 내 작성자 정보 조회
   * @returns WriterInfoDto
   * @throws ApiError
   */
  public static getMyWriterInfo(): CancelablePromise<WriterInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/writer_infos/me',
    });
  }

  /**
   * 내 작성자 정보 수정
   * @param requestBody
   * @returns WriterInfoDto
   * @throws ApiError
   */
  public static updateMyWriterInfo(
    requestBody: UpdateWriterInfoDto
  ): CancelablePromise<WriterInfoDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/writer_infos/me',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
