/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateMyPasswordDto } from '../models/UpdateMyPasswordDto';
import type { UpdateMyProfileDto } from '../models/UpdateMyProfileDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {
  /**
   * 내 정보 조회
   * @returns UserDto
   * @throws ApiError
   */
  public static getMe(): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/me',
    });
  }

  /**
   * 내 정보 수정
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static updateMyProfile(
    requestBody: UpdateMyProfileDto
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/users/me',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 회원 탈퇴
   * @returns any
   * @throws ApiError
   */
  public static deleteMe(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/me',
    });
  }

  /**
   * 내 비밀번호 수정
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static updateMyPassword(
    requestBody: UpdateMyPasswordDto
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/users/me/password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 바나나파츠 전체 판매자 수 조회
   * @returns number
   * @throws ApiError
   */
  public static getSellerCount(): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/seller-count',
    });
  }
}
