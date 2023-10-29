/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiEntity } from './WikiEntity';

export type WikiParagraphEntity = {
  title: string;
  body: string;
  wikiIndex: number;
  wikiId: number;
  wiki: WikiEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
