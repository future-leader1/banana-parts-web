/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PresignedPostDto = {
  /**
   * 파일 업로드 URL
   */
  url: string;
  /**
   * 파일 업로드시 body에 담아야 하는 데이터
   */
  fields: any;
};
