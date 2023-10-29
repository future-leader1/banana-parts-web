/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NotificationType } from './NotificationType';
import type { NotificationUserDto } from './NotificationUserDto';

export type GetNotificationResultDto = {
  type: NotificationType;
  id: number;
  createdAt: string;
  productEstimateId?: number;
  boardId?: number;
  wikiId?: number;
  sender: NotificationUserDto;
  receiver: NotificationUserDto;
};
