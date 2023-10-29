/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiOpinionType } from './WikiOpinionType';

export type CreateWikiRequestHistoryDto = {
  requestType: WikiOpinionType;
  body: string;
  wikiId: number;
};
