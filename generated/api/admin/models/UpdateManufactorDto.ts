/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ManufactorTag } from './ManufactorTag';

export type UpdateManufactorDto = {
  companyName: string;
  logoUrl?: string;
  alphabetSortTag?: string;
  manufactorTags?: Array<ManufactorTag>;
};
