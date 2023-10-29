/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserSearchType } from '../models/AdminUserSearchType';
import type { AdminUserSignupResultDto } from '../models/AdminUserSignupResultDto';
import type { CountUserDto } from '../models/CountUserDto';
import type { DeleteUserDto } from '../models/DeleteUserDto';
import type { PaginatedGetUserResultDtoListDto } from '../models/PaginatedGetUserResultDtoListDto';
import type { PaginatedUserEntityListDto } from '../models/PaginatedUserEntityListDto';
import type { SignUpDto } from '../models/SignUpDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserEntitiesService {
  /**
   * 유저 관리 조회
   * @param searchType
   * @param searchKeyword
   * @param approvalTypes
   * @param isApproved
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetUserResultDtoListDto
   * @throws ApiError
   */
  public static getUserAdmin(
    searchType?: AdminUserSearchType,
    searchKeyword?: string,
    approvalTypes?: Array<string>,
    isApproved?: boolean,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetUserResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-entities/user',
      query: {
        searchType: searchType,
        searchKeyword: searchKeyword,
        approvalTypes: approvalTypes,
        isApproved: isApproved,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 어드민이 직접 유저 생성
   * @param requestBody
   * @returns AdminUserSignupResultDto
   * @throws ApiError
   */
  public static signupUserAdmin(
    requestBody: SignUpDto
  ): CancelablePromise<AdminUserSignupResultDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user-entities/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 내 정보 조회
   * @returns UserDto
   * @throws ApiError
   */
  public static userControllerMe(): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/me',
    });
  }

  /**
   * 유저 관리 통계 조회
   * @returns CountUserDto
   * @throws ApiError
   */
  public static getUserStaticsAdmin(): CancelablePromise<CountUserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-entities/statistics',
    });
  }

  /**
   * 회원 탈퇴
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteUser(requestBody: DeleteUserDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/user-entities/delete-user',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 페이지네이션 전체 목록 조회
   * /items
   * /items?page=1&limit=25
   * /items?filter={"name": "john"}
   * /items?filter={"email": {"ilike": "gmail"}}
   * /items?filter={"date": {"between": ["2022-05-01T15:00:00Z", "2022-05-02T15:00:00Z"]}}
   * /items?filter={"id": {"in": [1,2,3]}}
   * /items?filter={"relationItem.id": 1}
   * /items?filter={"relationItem.name": {"ilike": "john"}}
   * /items?sort={"id": "DESC"}
   * @param sort
   * @param filter
   * @param page
   * @param itemsPerPage
   * @returns PaginatedUserEntityListDto
   * @throws ApiError
   */
  public static findAllUserEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedUserEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 전체목록 엑셀 내보내기
   * /items
   * /items?filter={"name": "john"}
   * /items?filter={"email": {"ilike": "gmail"}}
   * /items?filter={"date": {"between": ["2022-05-01T15:00:00Z", "2022-05-02T15:00:00Z"]}}
   * /items?filter={"id": {"in": [1,2,3]}}
   * /items?filter={"relationItem.id": 1}
   * /items?filter={"relationItem.name": {"ilike": "john"}}
   * /items?sort={"id": "DESC"}
   * @param sort
   * @param filter
   * @returns any
   * @throws ApiError
   */
  public static findAllUserEntityAndExportToExcel(
    sort?: string,
    filter?: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-entities/xlsx',
      query: {
        sort: sort,
        filter: filter,
      },
    });
  }

  /**
   * ID로 단일 조회
   * /items/1
   * /items/1?filter={"name": "john"}
   * /items/1?filter={"email": {"ilike": "gmail"}}
   * /items/1?filter={"date": {"between": ["2022-05-01T15:00:00Z", "2022-05-02T15:00:00Z"]}}
   * /items/1?filter={"id": {"in": [1,2,3]}}
   * /items/1?filter={"relationItem.id": 1}
   * /items/1?filter={"relationItem.name": {"ilike": "john"}}
   * @param id
   * @param filter
   * @returns UserDto
   * @throws ApiError
   */
  public static findOneUserEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }

  /**
   * 단일수정
   * PATCH /items/1
   * @param id
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static updateUserEntity(
    id: number,
    requestBody: UpdateUserDto
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/user-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
