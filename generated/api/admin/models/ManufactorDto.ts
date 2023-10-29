/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ManufactorTagDto } from './ManufactorTagDto';

export type ManufactorDto = {
  id: number;
  createdAt: string;
  companyName: string;
  logoUrl?: string;
  alphabetSortTag?: string;
  manufactorTags: Array<ManufactorTagDto>;
};
