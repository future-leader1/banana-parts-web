/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WikiUserDto } from './WikiUserDto';

export type RelatedWikiResultDto = {
  writer: WikiUserDto;
  id: number;
  createdAt: string;
  title: string;
  thumbnail: string;
};
