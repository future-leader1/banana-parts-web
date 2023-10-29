/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminUserDto } from './AdminUserDto';
import type { AdminWikiCategoryDto } from './AdminWikiCategoryDto';
import type { AdminWikiTagJoinWikisDto } from './AdminWikiTagJoinWikisDto';
import type { WikiParagraphDetailDto } from './WikiParagraphDetailDto';
import type { WriterInfoDto } from './WriterInfoDto';

export type AdminWikiDto = {
  wikiCategory: AdminWikiCategoryDto;
  writerInfo: WriterInfoDto;
  wikiTagJoinWikis: Array<AdminWikiTagJoinWikisDto>;
  user: AdminUserDto;
  paragraphs: Array<WikiParagraphDetailDto>;
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
