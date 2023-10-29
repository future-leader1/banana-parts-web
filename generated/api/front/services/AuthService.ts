/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { FindPasswordDto } from '../models/FindPasswordDto';
import type { FindPasswordResultDto } from '../models/FindPasswordResultDto';
import type { FindUserIdDto } from '../models/FindUserIdDto';
import type { FindUserIdResultDto } from '../models/FindUserIdResultDto';
import type { LoginResultDto } from '../models/LoginResultDto';
import type { LoginWithUserIdDto } from '../models/LoginWithUserIdDto';
import type { SignUpDto } from '../models/SignUpDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {
  /**
   * 로그인
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static loginUser(
    requestBody: LoginWithUserIdDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 회원가입
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static signupUser(
    requestBody: SignUpDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 아이디찾기
   * @param requestBody
   * @returns FindUserIdResultDto
   * @throws ApiError
   */
  public static findUserId(
    requestBody: FindUserIdDto
  ): CancelablePromise<FindUserIdResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/find-id',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 비밀번호찾기
   * @param requestBody
   * @returns FindPasswordResultDto
   * @throws ApiError
   */
  public static findPassword(
    requestBody: FindPasswordDto
  ): CancelablePromise<FindPasswordResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/find-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 비밀번호 변경하기
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static changePassword(
    requestBody: ChangePasswordDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/change-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
