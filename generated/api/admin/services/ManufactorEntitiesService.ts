/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateManufactorDto } from '../models/CreateManufactorDto';
import type { DeleteManufactorDto } from '../models/DeleteManufactorDto';
import type { ManufactorDto } from '../models/ManufactorDto';
import type { PaginatedManufactorEntityListDto } from '../models/PaginatedManufactorEntityListDto';
import type { UpdateManufactorDto } from '../models/UpdateManufactorDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ManufactorEntitiesService {
  /**
   * 제조사 어드민 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createManufactorAdmin(
    requestBody: CreateManufactorDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/manufactor-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 제조사 어드민 선택 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteManufactorsAdmin(
    requestBody: DeleteManufactorDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/manufactor-entities',
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
   * @returns PaginatedManufactorEntityListDto
   * @throws ApiError
   */
  public static findAllManufactorEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedManufactorEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/manufactor-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 제조사 어드민 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static patchManufactorAdmin(
    id: number,
    requestBody: UpdateManufactorDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/manufactor-entities/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
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
   * @returns ManufactorDto
   * @throws ApiError
   */
  public static findOneManufactorEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<ManufactorDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/manufactor-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }

  /**
   * 단일삭제
   * DELETE /items/1
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static removeManufactorEntity(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/manufactor-entities/{id}',
      path: {
        id: id,
      },
    });
  }
}
