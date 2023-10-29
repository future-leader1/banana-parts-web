/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiEntity } from './WikiEntity';

export type WikiCategoryEntity = {
  label: string;
  ordering?: number;
  wikis: Array<WikiEntity>;
  id: number;
  createdAt: string;
  updatedAt: string;
};
