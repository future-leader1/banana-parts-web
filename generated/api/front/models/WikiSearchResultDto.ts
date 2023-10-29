/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyWikiCategoryDto } from './MyWikiCategoryDto';
import type { WikiTagDto } from './WikiTagDto';
import type { WikiUserDto } from './WikiUserDto';

export type WikiSearchResultDto = {
  writer: WikiUserDto;
  wikiCategory: MyWikiCategoryDto;
  wikiTags: Array<WikiTagDto>;
  id: number;
  createdAt: string;
  title: string;
  thumbnail: string;
};
