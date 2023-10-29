/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminUserDto } from './AdminUserDto';
import type { AdminWikiCategoryDto } from './AdminWikiCategoryDto';
import type { WikiParagraphDetailDto } from './WikiParagraphDetailDto';
import type { WikiTagDto } from './WikiTagDto';
import type { WriterInfoDto } from './WriterInfoDto';

export type AdminWikiDetailDto = {
  wikiTags: Array<WikiTagDto>;
  id: number;
  title: string;
  thumbnail: string;
  outline: string;
  etc?: string;
  source?: string;
  wikiCategory: AdminWikiCategoryDto;
  writerInfo: WriterInfoDto;
  user: AdminUserDto;
  paragraphs: Array<WikiParagraphDetailDto>;
};
