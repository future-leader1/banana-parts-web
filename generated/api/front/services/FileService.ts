/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePresignedPostDto } from '../models/CreatePresignedPostDto';
import type { PresignedPostDto } from '../models/PresignedPostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileService {
  /**
   * 파일 업로드 주소 생성
   * @param requestBody
   * @returns PresignedPostDto
   * @throws ApiError
   */
  public static createPresignedPost(
    requestBody: CreatePresignedPostDto
  ): CancelablePromise<PresignedPostDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/files/upload',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
