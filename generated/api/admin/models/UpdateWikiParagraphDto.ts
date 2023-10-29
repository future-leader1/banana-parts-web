/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateWikiParagraphDto = {
  /**
   * 위키-문단 id ( 업데이트 시)
   */
  id?: number;
  /**
   * 문단 제목
   */
  title: string;
  /**
   * 문단 내용
   */
  body: string;
};
