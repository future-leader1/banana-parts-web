/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiTagJoinWikiEntity } from './WikiTagJoinWikiEntity';

export type WikiTagEntity = {
  label: string;
  wikiTagJoinWikis: Array<WikiTagJoinWikiEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};
