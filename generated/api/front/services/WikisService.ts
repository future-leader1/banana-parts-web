/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWikiDto } from '../models/CreateWikiDto';
import type { GetPopularWikiResultDto } from '../models/GetPopularWikiResultDto';
import type { PaginatedAllWikiDtoListDto } from '../models/PaginatedAllWikiDtoListDto';
import type { PaginatedHost } from '../models/PaginatedHost';
import type { PaginatedMyWikiDtoListDto } from '../models/PaginatedMyWikiDtoListDto';
import type { PaginatedWikiSearchResultDtoListDto } from '../models/PaginatedWikiSearchResultDtoListDto';
import type { RelatedWikiResultDto } from '../models/RelatedWikiResultDto';
import type { UpdateWikiDto } from '../models/UpdateWikiDto';
import type { ValidateDuplicateDto } from '../models/ValidateDuplicateDto';
import type { WikiCategoryListDto } from '../models/WikiCategoryListDto';
import type { WikiDetailDto } from '../models/WikiDetailDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WikisService {
  /**
   * 위키 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createWiki(requestBody: CreateWikiDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/wikis',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 내가 작성한 위키 목록 조회
   * @param page
   * @param itemsPerPage
   * @param searchKeyword 검색 키워드
   * @returns PaginatedMyWikiDtoListDto
   * @throws ApiError
   */
  public static getMyWikis(
    page: number = 1,
    itemsPerPage: number = 30,
    searchKeyword?: string
  ): CancelablePromise<PaginatedMyWikiDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/me',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 관련 위키 조회
   * 해당 카테고리에 추가적인 위키가 없는 경우 undefined를 리턴합니다.
   * @param wikiCategoryId
   * @param wikiId
   * @returns RelatedWikiResultDto
   * @throws ApiError
   */
  public static getRelatedWikis(
    wikiCategoryId: number,
    wikiId: number
  ): CancelablePromise<Array<RelatedWikiResultDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/related-wikis',
      query: {
        wikiCategoryId: wikiCategoryId,
        wikiId: wikiId,
      },
    });
  }

  /**
   * 카테고리별 위키 조회
   * @returns WikiCategoryListDto
   * @throws ApiError
   */
  public static getWikisMappedByCategory(): CancelablePromise<
    Array<WikiCategoryListDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/categories',
    });
  }

  /**
   * 위키 검색
   * @param searchKeyword
   * @param page
   * @param itemsPerPage
   * @returns PaginatedWikiSearchResultDtoListDto
   * @throws ApiError
   */
  public static searchWiki(
    searchKeyword: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedWikiSearchResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/search',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        searchKeyword: searchKeyword,
      },
    });
  }

  /**
   * 위키 직상지의 다른 인기글 조회
   * @param writerId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedHost
   * @throws ApiError
   */
  public static getWriterPopularWikis(
    writerId: number,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedHost> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/writer-popular',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
        writerId: writerId,
      },
    });
  }

  /**
   * 전문가 작성 위키 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedHost
   * @throws ApiError
   */
  public static getExpertWikis(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedHost> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/experts',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 위키 인기순 조회
   * @param page
   * @param itemsPerPage
   * @returns GetPopularWikiResultDto
   * @throws ApiError
   */
  public static getPopularWikis(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<Array<GetPopularWikiResultDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/popular',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 위키 전체 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAllWikiDtoListDto
   * @throws ApiError
   */
  public static getAllWikis(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedAllWikiDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/all',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 위키 상세 조회
   * @param id
   * @returns WikiDetailDto
   * @throws ApiError
   */
  public static getWikiDetail(id: number): CancelablePromise<WikiDetailDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/wikis/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 위키 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateWiki(
    id: number,
    requestBody: UpdateWikiDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/wikis/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 위키 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteWiki(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/wikis/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * 위키 제목 중복 체크
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static validDuplicateTitle(
    requestBody: ValidateDuplicateDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/wikis/valid-duplicate-title',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
