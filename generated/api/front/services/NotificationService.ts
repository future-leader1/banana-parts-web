/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedGetNotificationResultDtoListDto } from '../models/PaginatedGetNotificationResultDtoListDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationService {
  /**
   * 내 알림 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedGetNotificationResultDtoListDto
   * @throws ApiError
   */
  public static getMyNotification(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedGetNotificationResultDtoListDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/notifications',
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * 내 알림 전체 읽음 처리
   * @returns any
   * @throws ApiError
   */
  public static deleteNotifications(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/notifications',
    });
  }

  /**
   * 내 알림 단일 삭제
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteMyNotification(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/notifications/{id}',
      path: {
        id: id,
      },
    });
  }
}
