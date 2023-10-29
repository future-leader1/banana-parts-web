/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from '../models/CreateProductDto';
import type { DeleteProductsDto } from '../models/DeleteProductsDto';
import type { PaginatedProductEntityListDto } from '../models/PaginatedProductEntityListDto';
import type { ProductDto } from '../models/ProductDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductEntitiesService {
  /**
   * 어드민 상품 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createProductAdmin(
    requestBody: CreateProductDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/product-entities',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 어드민 상품 선택 삭제
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteProductsAdmin(
    requestBody: DeleteProductsDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/product-entities',
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
   * @returns PaginatedProductEntityListDto
   * @throws ApiError
   */
  public static findAllProductEntityWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedProductEntityListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-entities',
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 어드민 상품 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateProductAdmin(
    id: number,
    requestBody: UpdateProductDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/product-entities/{id}',
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
   * @returns ProductDto
   * @throws ApiError
   */
  public static findOneProductEntityById(
    id: number,
    filter?: string
  ): CancelablePromise<ProductDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/product-entities/{id}',
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
