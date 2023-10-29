/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminUserDto } from './AdminUserDto';
import type { AdminWikiHistoryDto } from './AdminWikiHistoryDto';
import type { WikiOpinionType } from './WikiOpinionType';

export type AdminWikiRequestHistoryDto = {
  requestType: WikiOpinionType;
  wiki: AdminWikiHistoryDto;
  user: AdminUserDto;
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  isViewed: boolean;
  wikiId: number;
  userId: number;
};
