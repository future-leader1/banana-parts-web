/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateWikiParagraphDto } from './CreateWikiParagraphDto';

export type CreateWikiDto = {
  /**
   * 위키 제목
   */
  title: string;
  /**
   * 위키 썸네일
   */
  thumbnail: string;
  /**
   * 위키 개요
   */
  outline: string;
  /**
   * 위키 기타
   */
  etc?: string;
  /**
   * 위키 출처
   */
  source?: string;
  /**
   * 위키 태그 리스트
   */
  tags?: Array<string>;
  /**
   * 위키-카테고리 ID
   */
  wikiCategoryId: number;
  /**
   * 위키 문단 리스트
   */
  paragraphs: Array<CreateWikiParagraphDto>;
};
