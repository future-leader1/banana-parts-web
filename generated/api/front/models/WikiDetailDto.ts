/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyWikiCategoryDto } from './MyWikiCategoryDto';
import type { WikiParagraphDetailDto } from './WikiParagraphDetailDto';
import type { WikiTagDto } from './WikiTagDto';
import type { WikiUserDto } from './WikiUserDto';
import type { WriterInfoWikiDetailDto } from './WriterInfoWikiDetailDto';

export type WikiDetailDto = {
  writer: WikiUserDto;
  writerInfo: WriterInfoWikiDetailDto;
  wikiCategory: MyWikiCategoryDto;
  paragraphs: Array<WikiParagraphDetailDto>;
  wikiTags: Array<WikiTagDto>;
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: string;
  outline: string;
  etc?: string;
  source?: string;
  viewCount: number;
  isDeleted: boolean;
  deletedAt?: string;
  writerInfoId: number;
  userId: number;
  wikiCategoryId: number;
};
