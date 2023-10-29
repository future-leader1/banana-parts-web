/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreatePresignedPostDto = {
  /**
   * 파일 카테고리
   */
  fileCategory: CreatePresignedPostDto.fileCategory;
  /**
   * 파일명
   */
  fileName: string;
};

export namespace CreatePresignedPostDto {
  /**
   * 파일 카테고리
   */
  export enum fileCategory {
    IMAGE = 'IMAGE',
    FILE = 'FILE',
    REQUEST = 'REQUEST',
  }
}
