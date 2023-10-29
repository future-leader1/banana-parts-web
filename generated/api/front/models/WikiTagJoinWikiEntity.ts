/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiEntity } from './WikiEntity';
import type { WikiTagEntity } from './WikiTagEntity';

export type WikiTagJoinWikiEntity = {
  wikiId: number;
  wikiTagId: number;
  wikiTag: WikiTagEntity;
  wiki: WikiEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
