/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyRequestHistoryWikiDto } from './MyRequestHistoryWikiDto';
import type { WikiOpinionType } from './WikiOpinionType';
import type { WikiRequestHistoryUserDto } from './WikiRequestHistoryUserDto';

export type MyWikiRequestHistoryDto = {
  requestType: WikiOpinionType;
  user: WikiRequestHistoryUserDto;
  wiki: MyRequestHistoryWikiDto;
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  isViewed: boolean;
  wikiId: number;
  userId: number;
};
